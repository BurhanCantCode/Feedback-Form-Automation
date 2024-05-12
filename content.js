chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Helper functions
  function selectRandomRadioButtons(radioButtons, selectFirst = false) {
    const totalSets = radioButtons.length / 5;

    for (let setIndex = 0; setIndex < totalSets; setIndex++) {
      const startIndex = setIndex * 5;
      const endIndex = startIndex + 5;

      // Uncheck all radio buttons in the current set
      for (let buttonIndex = startIndex; buttonIndex < endIndex; buttonIndex++) {
        radioButtons[buttonIndex].checked = false;
      }

      // Check the randomly selected radio button in the current set
      const selectIndex = selectFirst ? startIndex : Math.floor(Math.random() * 5) + startIndex;
      radioButtons[selectIndex].checked = true;
      console.log(`Radio button checked in set ${setIndex + 1}`);
    }
  }

  function populateTextAreas(textAreas, feedbackArrays) {
    if (textAreas.length > 0) {
      for (let i = 0; i < textAreas.length && i < feedbackArrays.length; i++) {
        const randomIndex = Math.floor(Math.random() * feedbackArrays[i].length);
        textAreas[i].value = feedbackArrays[i][randomIndex];
        console.log(`Content added to text area ${i + 1}`);
      }
    } else {
      console.log("No text areas found.");
    }
  }

  function handleMessage(request) {
    const radioButtons = document.querySelectorAll(".m-list-timeline__items .rdo");
    const textAreas = document.querySelectorAll('textarea[name="FB_Text"]');

    if (radioButtons.length > 0) {
      if (request.action === "randomlySelect") {
        selectRandomRadioButtons(radioButtons);
        populateTextAreas(textAreas, [
          mixedLabInstructorFeedback,
          courseEvaluation,
          instructorEvaluation,
          learningMaterialEvaluation
        ]);
      } else if (request.action === "positive") {
        selectRandomRadioButtons(radioButtons, true);
        populateTextAreas(textAreas, [
          positiveLabInstructorFeedback,
          courseEvaluation,
          instructorEvaluation,
          learningMaterialEvaluation
        ]);
      } else if (request.action === "negative") {
        selectRandomRadioButtons(radioButtons, false);
        populateTextAreas(textAreas, [
          negativeLabInstructorFeedback,
          courseEvaluation,
          instructorEvaluation,
          learningMaterialEvaluation
        ]);
      } else if (request.action === "neutral") {
        selectRandomRadioButtons(radioButtons);
        populateTextAreas(textAreas, [
          neutralLabInstructorFeedback,
          courseEvaluation,
          instructorEvaluation,
          learningMaterialEvaluation
        ]);
      }
    } else {
      console.log("No radio buttons found.");
    }

    sendResponse({ message: `${request.action} selection completed.` });
  }

  // Check if the request is valid
  if (request && request.action) {
    if (request.action === "pageLoaded") {
      console.log("Page loaded; initialization may be performed here if needed.");
    } else {
      handleMessage(request);
    }
  } else {
    console.log("Invalid request received.");
  }

  // Ensure that the listener returns true for asynchronous responses
  return true;
});

// Feedback arrays
const courseEvaluation = [
  "The course content was well-organized and easy to follow, providing a comprehensive understanding of the subject matter.",
  "Quizzes were challenging and didn't align well with the material covered in the lectures.",
  "The instructor was knowledgeable and engaging, making the learning experience enjoyable.",
  "Assignments lacked clear instructions, leading to confusion among students.",
  "The course fostered a collaborative learning environment through group projects and discussions.",
  "Evaluation heavily relied on a single final exam, putting excessive pressure on students for a one-time performance.",
  "Regular feedback on assignments was provided promptly, aiding in continuous improvement.",
  "The online platform used for quizzes was unreliable, causing technical difficulties and disruptions during assessments.",
  "The course incorporated real-world applications, enhancing the practical relevance of the concepts learned.",
  "Pacing of the course was uneven, with some topics rushed through while others were not covered in sufficient detail.",
  "The course materials were outdated, making it challenging to connect theoretical concepts to real-world scenarios.",
  "The grading criteria were unclear, making it difficult to understand how assessments were being evaluated.",
  "The course lacked flexibility in accommodating different learning styles, hindering the overall learning experience.",
  "The instructor showed a lack of availability outside of class, making it challenging to seek additional help when needed.",
  "The course lacked opportunities for hands-on practice, leaving students with a theoretical understanding but limited practical skills.",
  "The assigned readings were overly complex, making it difficult for students to grasp essential concepts.",
  "The group projects were poorly organized, leading to unequal distribution of workload and frustration among team members.",
  "The course materials were disorganized, making it challenging to locate specific information when needed.",
  "The instructor frequently went off-topic during lectures, causing confusion and disrupting the flow of the class.",
  "The course lacked a clear connection between lectures and practical applications, leaving students struggling to see the relevance of the material."
];

const instructorEvaluation = [
  "Instructor's delivery of lectures was engaging and facilitated a dynamic learning environment.",
  "Classroom learning environment was conducive to active participation and discussions.",
  "Instructor's teaching style effectively conveyed complex concepts in an easily understandable manner.",
  "Classroom learning environment fostered a sense of collaboration among students.",
  "Instructor's use of multimedia resources enhanced the overall learning experience.",
  "Classroom atmosphere encouraged critical thinking and problem-solving.",
  "Instructor effectively incorporated real-world examples to illustrate theoretical concepts.",
  "Classroom learning environment supported diverse learning styles and preferences.",
  "Instructor demonstrated a passion for the subject matter, creating enthusiasm among students.",
  "Classroom interactions were respectful, promoting an inclusive and supportive atmosphere.",
  "The instructor's communication was unclear at times, causing confusion among students about course expectations.",
  "The classroom lacked proper technological support, leading to disruptions during online lectures.",
  "The instructor showed a lack of responsiveness to student concerns, impacting the overall learning experience.",
  "The grading feedback provided by the instructor was vague, making it difficult for students to understand their mistakes.",
  "The instructor did not effectively address student questions during lectures, leaving uncertainties unresolved.",
  "The pace of the lectures was inconsistent, making it challenging for students to keep up with the material.",
  "The instructor relied too heavily on a single teaching method, neglecting the diverse learning preferences of the students.",
  "The classroom lacked a structured approach to discussions, resulting in disorganized and unproductive conversations.",
  "The instructor's expectations for participation were unclear, causing anxiety among students.",
  "The instructor's assessment of student understanding was inadequate, leading to gaps in the coverage of essential topics."
];

const learningMaterialEvaluation = [
  "Learning materials, including textbooks, provided a comprehensive coverage of the course content.",
  "Reference books recommended were helpful in gaining a deeper understanding of the subject.",
  "Video resources effectively complemented the learning materials, offering visual explanations and examples.",
  "The variety of learning resources contributed to a well-rounded understanding of the topics.",
  "Supplementary materials were readily available and supported self-paced learning.",
  "The recommended textbooks were well-structured and aligned with the course objectives.",
  "Additional readings enhanced the learning experience by providing diverse perspectives.",
  "Video content was well-produced, making it easy to follow and understand complex concepts.",
  "The availability of online resources facilitated access to additional study materials.",
  "The selection of learning materials catered to different learning styles, accommodating various preferences.",
  "The learning materials were poorly organized, making it challenging to find relevant information when needed.",
  "The recommended readings were overly academic, making it difficult for students to connect theory to practical applications.",
  "The online platform for accessing learning materials was outdated and prone to technical issues.",
  "The supplementary materials were irrelevant to the course content, causing confusion among students.",
  "The recommended videos were too lengthy, making it challenging for students to stay focused on the key concepts.",
  "The learning materials lacked diversity, limiting the exposure of students to different perspectives.",
  "The online platform for quizzes had limited functionality, hindering the effectiveness of self-assessment.",
  "The supplementary materials were not updated to reflect recent advancements in the field, impacting the relevance of the content.",
  "The recommended textbooks were hard to find or not readily available, causing delays in students' access to essential resources.",
  "The learning materials did not provide enough practical examples, making it difficult for students to apply theoretical knowledge."
];

const mixedLabInstructorFeedback = [
  "The lab instructor exhibited exceptional expertise, delivering content with clarity and precision.",
  "The learning environment in the lab was not conducive to active participation; it felt disorganized and unstructured.",
  "Lab instructions were unclear and poorly communicated, hindering the learning process for students.",
  "The lab instructor demonstrated a keen understanding of complex concepts, making challenging topics more accessible.",
  "Hands-on activities in the lab were unengaging and failed to complement the theoretical aspects of the course effectively.",
  "Lab sessions were well-organized, creating an environment that promoted a sense of structure and focus.",
  "The lab instructor struggled to convey complex concepts, making it difficult for students to grasp essential topics.",
  "The lab instructor encouraged critical thinking and problem-solving skills, fostering intellectual growth among students.",
  "Multimedia resources used in the lab were ineffective, failing to enhance the overall learning experience.",
  "The lab environment supported diverse learning styles and preferences, catering to the needs of every student.",
  "The lab instructor's passion for the subject matter was evident, creating enthusiasm and inspiration among students.",
  "Lab instructions were clearly communicated, contributing to a smooth and efficient learning process."
];

const positiveLabInstructorFeedback = [
  "The lab instructor exhibited exceptional expertise, delivering content with clarity and precision.",
  "The learning environment in the lab was highly conducive to active participation and collaborative learning.",
  "Lab instructions were clearly communicated, contributing to a smooth and efficient learning process.",
  "The lab instructor demonstrated a keen understanding of complex concepts, making challenging topics more accessible.",
  "The hands-on activities in the lab were engaging and complemented the theoretical aspects of the course effectively.",
  "Lab sessions were well-organized, creating an environment that promoted a sense of structure and focus.",
  "The lab instructor encouraged critical thinking and problem-solving skills, fostering intellectual growth among students.",
  "Multimedia resources used in the lab enhanced the overall learning experience, providing visual explanations and examples.",
  "The lab environment supported diverse learning styles and preferences, catering to the needs of every student.",
  "The lab instructor's passion for the subject matter was evident, creating enthusiasm and inspiration among students."
];

const negativeLabInstructorFeedback = [
  "The lab instructor lacked expertise, leading to confusion and frustration among students.",
  "The learning environment in the lab was not conducive to active participation; it felt disorganized and unstructured.",
  "Lab instructions were unclear and poorly communicated, hindering the learning process for students.",
  "The lab instructor struggled to convey complex concepts, making it difficult for students to grasp essential topics.",
  "Hands-on activities in the lab were unengaging and failed to complement the theoretical aspects of the course effectively.",
  "Lab sessions were disorganized and lacked structure, creating a chaotic learning environment.",
  "The lab instructor did not encourage critical thinking and problem-solving, hindering intellectual growth among students.",
  "Multimedia resources used in the lab were ineffective, failing to enhance the overall learning experience.",
  "The lab environment did not support diverse learning styles and preferences, neglecting the needs of some students.",
  "The lab instructor displayed a lack of passion for the subject matter, creating a dull and uninspiring atmosphere."
];

const neutralLabInstructorFeedback = [
  "The lab instructor provided adequate expertise, delivering content with moderate clarity.",
  "The learning environment in the lab had aspects that were conducive to active participation, but improvements could be made.",
  "Lab instructions were communicated, but some clarity issues impacted the learning process for students.",
  "The lab instructor demonstrated a basic understanding of complex concepts, providing a reasonable level of accessibility.",
  "Hands-on activities in the lab were moderately engaging, with room for improvement in complementing theoretical aspects.",
  "Lab sessions had a moderate level of organization, providing a somewhat structured learning environment.",
  "The lab instructor had a balanced approach to encouraging critical thinking and problem-solving among students.",
  "Multimedia resources used in the lab had a moderate impact on enhancing the overall learning experience.",
  "The lab environment partially supported diverse learning styles and preferences, with room for improvement.",
  "The lab instructor displayed a standard level of enthusiasm for the subject matter."
];
