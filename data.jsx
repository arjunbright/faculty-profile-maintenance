/* ----------------------- Register ------------------------ */

const register = {
    "full_name": "full name",
    "username": 1234,
    "email": "example@email.com",
    "password": "password"
}

/* ------------------------ Login ----------------------- */

const login = {
    "username": 1234,
    "password": "password"
}

const login1 = {
    "username": "example@email.com",
    "password": "password"
}

/* -------------------------- Forget Password --------------------- */

const forget_password = {
    "email": "example@email.com"
}

/* -------------------------- Reset Password --------------------- */

const reset_password = {
    "password": "new password"
}

/* --------------------------- User Details -------------------- */

const User_info_api = {
    "phone": 1234567890,
    "address": "654, south street, Tirunelveli, tvl - 627 600",
    "position_id": 4,
    "department_id": 3,
    "position_present_where": "College of Engineering Guindy, Anna University, Chennai",
    "position_present_from": "2012-05-01"
}

/* --------------------------- Previous Positions -------------------*/
const Positions_prev_api = [
    {
        "position_prev_id": 0, // For new data
        "position_id": 4,
        "department_id": 2,
        "position_prev_where": "College of Engineering Guindy, Anna University, Chennai",
        "position_prev_from": "1993-05-02",
        "position_prev_to": "2000-07-07"
    },
    {
        "position_prev_id": 19,
        "position_id": 5,
        "department_id": 1,
        "position_prev_where": "MIT, Anna University, Chennai",
        "position_prev_from": "2001-05-02",
        "position_prev_to": "2003-07-07"
    }, {
        "position_prev_id": 18,
        "position_id": 4,
        "department_id": 2,
        "position_prev_where": "College of Engineering Trichy, Anna University, Trichy",
        "position_prev_from": "2004-05-02",
        "position_prev_to": "2008-08-01"
    },
    {
        "position_prev_id": 20,
        "position_id": 5,
        "department_id": 1,
        "position_prev_where": "Anna University Regional Campus Madurai, Madurai",
        "position_prev_from": "2010-11-12",
        "position_prev_to": "2015-08-08"
    }
]

/* --------------------------- Memberships -------------------*/

const Memberships_api = [
    {
        "membership_id": 0, // For new data
        "membership": "IEEE: 9532143"
    },
    {
        "membership_id": 2,
        "membership": "CSI - Life Member : 54353454 "
    }
]

/* --------------------------- Area of specialization -------------------*/

const Area_of_specialization_api = [
    {
        "specialization_id": 0, // For new data
        "specialization": "INFORMATION SECURITY"
    },
    {
        "specialization_id": 11,
        "specialization": "CLOUD COMPUTING"
    }
]

/* --------------------------- Present Additional Responsibilities -------------------*/

const Additional_responsibilities_present_api = [
    {
        "additional_responsibility_present_id": 0, // For new data
        "additional_responsibility_present":
            "ATTESTING OFFICER, Office of the Controller of Examinations, Anna University, Tirunelveli",
        "additional_responsibility_present_from": "2015-05-05"
    },
    {
        "additional_responsibility_present_id": 6,
        "additional_responsibility_present":
            "Student Counsellor, Department of Mechanical Engineering, Anna University,Chennai",
        "additional_responsibility_present_from": "2020-05-05"
    }
]

/* --------------------------- Invited Lectures -------------------*/

const Invited_lectures_api = [
    {
        "invited_lecture_id": 0, // For new data
        "invited_lecture": "Delivered a Lecture on Network Programming, Security and Managemen in Faculty Development Programme organized by RCC, Anna University, Chennai - 600 025",
        "invited_lecture_at": ""
    },
    {
        "invited_lecture_id": 3,
        "invited_lecture": "Delivered a Lecture on Unix and Network Programming in Faculty Development Programmeorganized by Department of Information Technology , MIT, Anna University, Chennai 600 044",
        "invited_lecture_at": "2015-09-08"
    }
]

/* --------------------------- Previous Additional Responsibilities -------------------*/

const Additional_responsibilities_prev_api = [
    {
        "additional_responsibility_prev_id": 0, // For new data
        "additional_responsibility_prev":
            "Scrutiny Officer, MIT, Anna University, Chennai",
        "additional_responsibility_prev_from": "2005-09-08",
        "additional_responsibility_prev_to": ""
    },
    {
        "additional_responsibility_prev_id": 4,
        "additional_responsibility_prev":
            "Anti-ragging Committee - Coordinator, University College of Engineering, Arni, Anna University, Chennai",
        "additional_responsibility_prev_from": "2012-05-09",
        "additional_responsibility_prev_to": "2015-03-18"
    }
]

/* -------------------------------------- Degree ------------------------------------*/

const Degree_api = [
    {
        "degree_id": 0, // for new data
        "degree":
            "M.E. in COMPUTER SCIENCE ENGINEERING , MADURAI KAMARAJAR UNIVERSITY",
        "degree_from": "2006-09-08",
        "degree_to": "2009-03-01"
    },
    {
        "degree_id": 5,
        "degree": "M.B.A. ANNAMALAI UNIVERSITY, ANNAMALAI UNIVERSITY",
        "degree_from": "2010-09-08",
        "degree_to": "2012-03-01"
    }
]

/* -------------------------------------- Other Employment ------------------------------------*/

const Other_employment_api = [
    {
        "other_employment_id": 0, // For new data
        "other_employment": "Assistant Professor, Annamalai University",
        "other_employment_from": "2001-09-08",
        "other_employment_to": "2009-03-01"
    },
    {
        "other_employment_id": 3,
        "other_employment": "Professor, CEG",
        "other_employment_from": "2010-09-08",
        "other_employment_to": "2015-03-01"
    }
]

/* -------------------------------------- Programme Attended ------------------------------------*/

const Programme_attended_api = [
    {
        "programme_attended_id": 0, // For new data
        "programme_attended": "Attended a National level Short Course on AICE-ISTE Winter School on Advanced Java Programming organized by PSG College of Technology",
        "programme_attended_from": "2002-09-08",
        "programme_attended_to": "2002-09-12"
    },
    {
        "programme_attended_id": 3,
        "programme_attended": "Participated in a National level workshop on Object Oriented Analysis and Design using UML and Fundamentals of Rational Rose organized by Rational Software Development Company, India",
        "programme_attended_from": "2005-09-08",
        "programme_attended_to": ""
    }
]

/* -------------------------------------- Programme Chaired ------------------------------------*/

const Programme_chaired_api = [
    {
        "programme_chaired_id": 0, // For new data
        "programme_chaired": "Attended a National level Short Course on AICE-ISTE Winter School on Advanced Java Programming organized by PSG College of Technology",
        "programme_chaired_from": "2002-09-08",
        "programme_chaired_to": "2002-09-12"
    },
    {
        "programme_chaired_id": 3,
        "programme_chaired": "Participated in a National level workshop on Object Oriented Analysis and Design using UML and Fundamentals of Rational Rose organized by Rational Software Development Company, India",
        "programme_chaired_from": "2005-09-08",
        "programme_chaired_to": ""
    }
]

/* -------------------------------------- Programme Organized ------------------------------------*/

const Programme_organized_api = [
    {
        "programme_organized_id": 0, // For new data
        "programme_organized": "Attended a National level Short Course on AICE-ISTE Winter School on Advanced Java Programming organized by PSG College of Technology",
        "programme_organized_from": "2002-09-08",
        "programme_organized_to": "2002-09-12"
    },
    {
        "programme_organized_id": 3,
        "programme_organized": "Participated in a National level workshop on Object Oriented Analysis and Design using UML and Fundamentals of Rational Rose organized by Rational Software Development Company, India",
        "programme_organized_from": "2005-09-08",
        "programme_organized_to": ""
    }
]