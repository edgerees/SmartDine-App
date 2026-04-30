// Added by Edrees
export async function getStudents() {
  const response = await fetch("http://localhost:3001/api/students");

  if (!response.ok) {
    throw new Error("Failed to load student profiles");
  }

  return response.json();
}

export async function getStudentById(studentId) {
  const students = await getStudents();
  return students.find((student) => student.id === Number(studentId));
}