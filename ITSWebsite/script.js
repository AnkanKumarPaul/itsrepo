const answers = {
    course1: {
        q1: 'b',  // Correct answer for question 1 of Course 1
        q2: 'a',  // Correct answer for question 2 of Course 1
    },
    course2: {
        q1: 'a',  // Correct answer for question 1 of Course 2
        q2: 'c',  // Correct answer for question 2 of Course 2
    },
};

const videoSuggestions = {
    course1: {
        Basic: {
            url: "https://www.youtube.com/embed/video_id_basic1", // Replace with actual video embed URL for Basic
            link: "https://www.example.com/basic-video1",          // Replace with actual video link for Basic
        },
        Intermediate: {
            url: "https://www.youtube.com/embed/video_id_intermediate1", // Replace with actual video embed URL for Intermediate
            link: "https://www.example.com/intermediate-video1",          // Replace with actual video link for Intermediate
        },
        Advanced: {
            url: "https://www.youtube.com/embed/video_id_advanced1", // Replace with actual video embed URL for Advanced
            link: "https://www.example.com/advanced-video1",          // Replace with actual video link for Advanced
        },
    },
    course2: {
        Basic: {
            url: "https://www.youtube.com/embed/video_id_basic2", // Replace with actual video embed URL for Basic
            link: "https://www.example.com/basic-video2",          // Replace with actual video link for Basic
        },
        Intermediate: {
            url: "https://www.youtube.com/embed/video_id_intermediate2", // Replace with actual video embed URL for Intermediate
            link: "https://www.example.com/intermediate-video2",          // Replace with actual video link for Intermediate
        },
        Advanced: {
            url: "https://www.youtube.com/embed/video_id_advanced2", // Replace with actual video embed URL for Advanced
            link: "https://www.example.com/advanced-video2",          // Replace with actual video link for Advanced
        },
    },
};

document.getElementById('start-quiz').addEventListener('click', function () {
    const course = document.getElementById('course-dropdown').value;
    if (!course) {
        alert('Please select a course first.');
        return;
    }
    document.getElementById('course-selection').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';

    // Clear previous answers
    document.querySelectorAll('input[type="radio"]:checked').forEach(input => input.checked = false);
});

document.getElementById('quiz-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let score = 0;
    const course = document.getElementById('course-dropdown').value;

    // Check answers based on the selected course
    const currentAnswers = answers[course];

    for (let question in currentAnswers) {
        const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
        if (userAnswer && userAnswer.value === currentAnswers[question]) {
            score++;
        }
    }

    // Determine category based on score
    let category;
    if (score === 0) {
        category = 'Basic';
    } else if (score === 1) {
        category = 'Intermediate';
    } else {
        category = 'Advanced';
    }

    // Show result and video suggestion
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('result-message').textContent = `You scored ${score}. Category: ${category}`;

    // Suggest a video based on the category and course
    const videoData = videoSuggestions[course][category];
    document.getElementById('video-suggestion').innerHTML = `
        <p>Recommended Video:</p>
        <iframe width="560" height="315" src="${videoData.url}" frameborder="0" allowfullscreen></iframe>
        <p><a href="${videoData.link}" target="_blank">Watch more videos</a></p>
    `;
});
