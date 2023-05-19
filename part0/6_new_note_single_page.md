A diagram depicting the situation where 
the user posts a note in the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa . 

```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa , the JSON data (content&date) handled&sent by javascript event handler. 
    activate server
 ```
 No redirect, stays on the same page
