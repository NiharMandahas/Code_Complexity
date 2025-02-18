import requests
import os
import subprocess
import json
import re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import textwrap
@csrf_exempt
def run_code(request):
    if request.method == "POST":
        try:
            # Parse JSON data from request body
            data = json.loads(request.body)
            code = data.get("code", "")

            # Ensure the code is not empty
            if not code:
                return JsonResponse({'error': 'No code provided'}, status=400)

            # 1. Execute the code using subprocess
            process = subprocess.Popen(
                ['python3', '-c', code],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            stdout, stderr = process.communicate()

            # If there's an error in executing the code
            if stderr:
                return JsonResponse({'error': stderr.decode('utf-8')}, status=400)

            # 2. Send the code to Groq API for time complexity analysis
            api_key = os.environ.get("GROQ_API_KEY")
            url = "https://api.groq.com/openai/v1/chat/completions"
            model = "mixtral-8x7b-32768"  # Define the Groq model

            # Constructing the message for Groq API
            messages = [
                {"role": "system", "content": "You are an expert at analyzing the time complexity of Python code."},
                {"role": "user", "content": f"Analyze the time complexity of this Python function:\n```python\n{code}\n``` and in the end always add a line telling the final time complexity"}
            ]

            headers = {
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            }

            data_groq = {
                "model": model,
                "messages": messages,
                "temperature": 0
            }

            # Send request to Groq
            response = requests.post(url, headers=headers, json=data_groq)
            response_json = response.json()

            # Check for errors in the Groq response
            if response.status_code != 200 or "choices" not in response_json:
                return JsonResponse({'error': 'Error analyzing time complexity with Groq API'}, status=400)

            # Extract the time complexity and explanation from the Groq response
            time_complexity = response_json["choices"][0]["message"]["content"]

            # **Use regex to extract the time complexity**
            time_complexity_pattern = re.compile(r'O\([^\)]*\)')  # Matches O(n), O(n^2), etc.
            found_complexities = re.findall(time_complexity_pattern, time_complexity)

            # If multiple time complexities are found, take the last one
            extracted_time_complexity = found_complexities[-1] if found_complexities else "Unknown"
            explanation = "\n".join(textwrap.wrap(time_complexity, width=50))

            # 3. Return the code execution result, extracted time complexity, and explanation
            return JsonResponse({
                'result': stdout.decode('utf-8'),
                'time_complexity': extracted_time_complexity,  # Sending extracted time complexity
                'explanation': explanation  # Sending explanation
            })

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
