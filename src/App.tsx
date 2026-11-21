
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

type Student = {
    id: number;
    name: string;
    present: boolean;
};

function App() {

    const [attendance, setAttendance] = useLocalStorage<Student[]>(
        "attendance",
        [
            { id: 1, name: "Ahmad", present: true },
            { id: 2, name: "Fatima", present: false },
            { id: 3, name: "Maryam", present: true }
        ]
    );

    const [name, setName] = useState("");

    function addStudent() {
        if (name.trim() === "") return;

        const newStudent: Student = {
            id: Date.now(),
            name: name.trim(),
            present: false
        };

        setAttendance([...attendance, newStudent]);
        setName("");
    }

    function toggleAttendance(id: number) {
        setAttendance(
            attendance.map((student) =>
                student.id === id
                    ? { ...student, present: !student.present }
                    : student
            )
        );
    }

    const presentCount = attendance.filter(
        (student) => student.present
    ).length;

    const absentCount = attendance.length - presentCount;

    return (
        <div className="container">

            <h1>Attendance Tracker</h1>
            <p>Student Attendance Management System</p>

            <div className="summary">
                <div>
                    <h3>Total Students</h3>
                    <p>{attendance.length}</p>
                </div>

                <div>
                    <h3>Present</h3>
                    <p>{presentCount}</p>
                </div>

                <div>
                    <h3>Absent</h3>
                    <p>{absentCount}</p>
                </div>
            </div>

            <div className="form">
                <input
                    type="text"
                    placeholder="Enter student name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <button onClick={addStudent}>
                    Add Student
                </button>
            </div>

            <h2>Student List</h2>

            <div className="student-list">
                {attendance.map((student) => (
                    <div className="student" key={student.id}>
                        <span>{student.name}</span>

                        <button
                            className={student.present ? "present" : "absent"}
                            onClick={() => toggleAttendance(student.id)}
                        >
                            {student.present ? "Present" : "Absent"}
                        </button>
                    </div>
                ))}

                {attendance.length === 0 && (
                    <p>No students registered yet.</p>
                )}
            </div>

        </div>
    );
}

export default App;

