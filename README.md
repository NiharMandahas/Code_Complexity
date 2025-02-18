# Code_Complexity

## Overview

Analyzing time complexity is crucial for writing efficient and scalable code. Traditional LeetCode-like platforms require multiple test cases to estimate time complexity, but our project eliminates this need. Instead, it leverages the Groq API to analyze code logic and structure directly. The system features a Django backend for processing user queries and a LeetCode-like frontend for an intuitive user experience.

## Workflow
<img src="https://github.com/NiharMandahas/Code_Complexity/blob/main/visuals/flowchart.png" alt="Image description" width="1400" height="500"/>

## Web

Frontend (React):
The frontend is crafted using React, delivering a modern and intuitive user interface that mirrors the familiar LeetCode experience. At its core, it features a sophisticated code editor equipped with syntax highlighting capabilities, making code input seamless for users. The interface provides real-time feedback and displays analysis results in a clear, organized manner. React's component-based architecture ensures efficient state management and smooth API communication with the backend, while maintaining a responsive design that adapts to different screen sizes. The UI is thoughtfully designed to present complex time complexity analysis in an easily digestible format, enhancing the overall user experience.

Backend (Django):
The Django backend serves as the powerful engine behind the application, handling all server-side operations with robust reliability. It exposes REST API endpoints that process incoming code analysis requests and manages the crucial integration with the Groq API for time complexity analysis. The backend implements comprehensive request validation, error handling, and response formatting to ensure data integrity. Django's built-in features are leveraged to implement API authentication, rate limiting, and an efficient caching layer that optimizes performance. This architecture enables quick and accurate code analysis while maintaining scalability and security, providing a solid foundation for the application.

## Visuals
<img src="https://github.com/NiharMandahas/Code_Complexity/blob/main/visuals/Screenshot%202025-02-18%20at%208.40.49%E2%80%AFPM.png" alt="Image description" width="1400" height="500"/>


<img src="https://github.com/NiharMandahas/Code_Complexity/blob/main/visuals/Screenshot%202025-02-18%20at%208.41.16%E2%80%AFPM.png" alt="Image description" width="1400" height="500"/>
