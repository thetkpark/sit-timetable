# CS SIT Timetable API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![forthebadge](https://forthebadge.com/images/badges/0-percent-optimized.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/contains-technical-debt.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/contains-tasty-spaghetti-code.svg)](https://forthebadge.com)

[![forthebadge](https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](https://forthebadge.com)

A simple REST API and GraphQL build for CS@SIT student to get their timetable.

Build with Fastify and Apollo Server Fastify

The data extracted from the timetable in PDF using Google Cloud Vision API and create a JSON representation of it by `/util/readFromVision.ts`

Available at https://timetable.cscms.me/

## Installation & Usage

Install all the dependencies

> yarn 

Build the source code into JavaScript file

> yarn build

Run it with Node

> node build/main.js

## REST API Endpoints

- `/api` Get all subjects in that semester
  - Available query: 
    - year: Integer of 1 to 4
    - fastTrack: true | false
    - room: string of the roomId (Ex: CB2308)
    - day: Monday | Tuesday | Wednesday | Thursday | Friday
    
  - Example Response

    ```json
    [
        {
        "subject": "CSC261 Statistics for Scientists",
        "lecturer": "Dr.Debajyoti",
        "startTime": "13.30",
        "endTime": "16.30",
        "room": "CB2312",
        "year": [
          {
            "year": 1,
            "fastTrack": true
          },
          {
            "year": 2,
            "fastTrack": false
          }
        ],
        "day": "Monday"
      },...
    ]
    ```

    
- `/api/:subjectId` Get a specific subject
  
  - Ex: `/csc105`  (Case insensitive)
  
  - Example Response
  
    ```json
    {
      "subject": "CSC105 Web Application Development",
      "lecturer": "Asst. Prof. Dr. Chonlameth",
      "startTime": "13.00",
      "endTime": "17.00",
      "room": "Classroom 4/2",
      "year": [
        {
          "year": 1,
          "fastTrack": false
        }
      ],
      "day": "Wednesday"
    }
    ```
  
    

## GraphQL API Endpoint

Available at `/graphql`

