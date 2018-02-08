export const data = {
  school: {
    name: 'Tri County District School',
    color: '44df23',
    logo: 'https://www.placehold.it/200/200',
    address: {
      address1: '2320 Deerfield Ave',
      address2: '',
      city: 'Fremont',
      state: 'NE',
      zip: '68025'
    }
  },
  student: {
    name: 'Brock Ellis',
    first_name: 'Brock',
    last_name: 'Ellis',
    student_code: 'ELL1727-1',
    student_id: '12342342'
  },
  classes: [
    {
      name: 'Class 1',
      section: '001',
      teachers: [
        {
          name: 'Mrs. Ficnkle',
          first_name: 'Susan',
          last_name: 'Ficnkle'
        },
        {
          name: 'Mr. Corban',
          first_name: 'Mike',
          last_name: 'Corban'
        }
      ],
      period: 4,
      all_year: true,
      home_room: false,
      course_number: 'CL1',
      alt_course_number: 'CL2',
      subject: 'Math',
      primary_teacher: {
        name: 'Mr. Corban'
      },
      priority: 1,
      department: 'English',
      viewable: true,
      accessible: true,
      max_students: 50,
      grade_options: {
        grade_scale: 'Academic HS',
        allow_gradescale_overrides: true,
        comments: 'Free Form',
        weight: 1,
        grades_viewable: true
      },
      grade_categories: [
        { name: 'Assignments', weight: 80 },
        { name: 'Test', weight: 10 },
        { name: 'Participation', weight: 10 }
      ],
      subjects: [
        { order: 0, time: '9:00am', name: 'English', description: 'Test subject', grade_scale: 1234, color: '#b0b0b0' },
        { order: 0, time: '9:00am', name: 'English', description: 'Test subject', grade_scale: 1234, color: '#b0b0b0' },
        { order: 0, time: '9:00am', name: 'English', description: 'Test subject', grade_scale: 1234, color: '#b0b0b0' }
      ],
      grade: {
        student_grade_actual: 98.123,
        student_grade_posted: 98,
        student_letter: 'A',
        incomplete: false,
        comments: 'Great job!'
      }
    }
  ],
  family: {
    id: 1323423,
    code: 'ELL1727',
    name: 'Brock & Sara Ellis',
    formal_name: 'Mr. & Mrs. Ellis',
    address: {
      address1: '1225 North I Street',
      address2: '',
      city: 'Fremont',
      state: 'NE',
      zip: '68025'
    }
  }
}
