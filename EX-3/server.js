import express from 'express';
import courses from "./course.js";
import logger from "./middleware/logger.js";
import validateQuery from "./middleware/validateQuery.js";

const app = express();
const PORT = 3000;

app.use(logger);


app.get('/departments/:dept/courses', validateQuery, (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    let filtered = courses.filter(course => {
        if (course.department.toLowerCase() !== dept.toLowerCase()) return false;
        if (level && course.level !== level) return false;
        if (semester && course.semester !== semester) return false;
        if (minCredits && course.credits < parseInt(minCredits)) return false;
        if (maxCredits && course.credits > parseInt(maxCredits)) return false;
        if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) return false;
        return true;
    });

    res.json({ results: filtered, meta: { total: filtered.length } });
});

app.listen(3000, () => console.log(`Exercise 3 server running on ${PORT}`));