// server.js
import express from 'express';
import courses from "./course.js";
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria
    if (minCredits && maxCredits && parseInt(minCredits)> parseInt(maxCredits)){
        return res.status (400).json({error: "minCredits cannot be greather than maxCredits"});
    }

    let filteredCourses = courses.filter(course => {
        let matches = true; 
        if (course.department.toLowerCase () !== dept.toLowerCase()){
            matches = false; 
        }
        if (level && course.level !== level){
            matches = false; 
        }
        if (semester && course.semester !== semester){
            matches = false; 
        }
        if (minCredits && course.credit > parseInt(minCredits)){
            matches = false; 
        }
        if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) {
            matches = false;
        }
        return matches; 

    });
    res.json({
        results: filteredCourses,
        meta: {
            total: filteredCourses.length
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
