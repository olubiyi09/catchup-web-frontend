// import React, { useState } from "react";
// import { FiChevronDown, FiChevronUp, FiPlus, FiX } from "react-icons/fi";
// import styles from "./ManualEntry.module.css";
// import QuestionImageIcon from "@/components/IconsAndLogo/QuestionImageIcon";

// const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// const ManualEntry = () => {
//   const [subjectOpen, setSubjectOpen] = useState(false);
//   const [examTypeOpen, setExamTypeOpen] = useState(false);
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [selectedExamType, setSelectedExamType] = useState("");
//   const [question, setQuestion] = useState("");
//   const [explanation, setExplanation] = useState("");

//   // Image states
//   const [includeImage, setIncludeImage] = useState(false);
//   const [questionImage, setQuestionImage] = useState<File | null>(null);

//   // Answer options
//   const [options, setOptions] = useState([
//     { value: "", checked: false },
//     { value: "", checked: false },
//     { value: "", checked: false },
//     { value: "", checked: false },
//   ]);

//   const subjects = ["Mathematics", "Physics", "Chemistry"];
//   const examTypes = ["SSCE", "NECO", "WAEC"];

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setQuestionImage(e.target.files[0]);
//     }
//   };

//   const handleBlur = (index: number) => {
//     const newOptions = [...options];
//     if (newOptions[index].value.trim() !== "") {
//       newOptions[index].checked = true;
//     }
//     setOptions(newOptions);
//   };

//   const handleOptionChange = (index: number, val: string) => {
//     const newOptions = [...options];
//     newOptions[index].value = val;
//     setOptions(newOptions);
//   };

//   const addOption = () => {
//     setOptions([...options, { value: "", checked: false }]);
//   };

//   const removeOption = (index: number) => {
//     const newOptions = options.filter((_, i) => i !== index);
//     setOptions(newOptions);
//   };

//   return (
//     <main className={styles.wrapper}>
//       <div>
//         <h1 className={styles.pageTitle}>Add New Question</h1>

//         {/* Dropdowns */}
//         <div className={styles.dropdownRow}>
//           {/* Subject Dropdown */}
//           <div
//             className={styles.customDropdown}
//             onClick={() => setSubjectOpen(!subjectOpen)}
//           >
//             <label>Subject</label>
//             <div className={styles.selected}>
//               {selectedSubject || "Select Subject"}
//               {subjectOpen ? <FiChevronUp /> : <FiChevronDown />}
//             </div>
//             {subjectOpen && (
//               <div className={styles.options}>
//                 {subjects.map((sub) => (
//                   <div
//                     key={sub}
//                     className={styles.option}
//                     onClick={() => {
//                       setSelectedSubject(sub);
//                       setSubjectOpen(false);
//                     }}
//                   >
//                     {sub}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Exam Type Dropdown */}
//           <div
//             className={styles.customDropdown}
//             onClick={() => setExamTypeOpen(!examTypeOpen)}
//           >
//             <label>Exam Type</label>
//             <div className={styles.selected}>
//               {selectedExamType || "Select Exam Type"}
//               {examTypeOpen ? <FiChevronUp /> : <FiChevronDown />}
//             </div>
//             {examTypeOpen && (
//               <div className={styles.options}>
//                 {examTypes.map((type) => (
//                   <div
//                     key={type}
//                     className={styles.option}
//                     onClick={() => {
//                       setSelectedExamType(type);
//                       setExamTypeOpen(false);
//                     }}
//                   >
//                     {type}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Question Textarea */}
//         <div className={styles.textareaWrapper}>
//           <label>Question</label>
//           <textarea
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Enter question here..."
//           />
//         </div>

//         {/* Image upload section */}
//         <section className={styles.imageSection}>
//           <div className={styles.checkRow}>
//             <label className={styles.customCheckbox}>
//               <input
//                 type="checkbox"
//                 checked={includeImage}
//                 onChange={(e) => setIncludeImage(e.target.checked)}
//               />
//               <span className={styles.checkmark}></span>
//               <QuestionImageIcon className={styles.imageIcon} />
//               <span className={styles.checkLabel}>Include Image/Diagram</span>
//             </label>
//           </div>

//           {includeImage && (
//             <div className={styles.uploadWrapper}>
//               <label
//                 className={styles.uploadBox}
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={(e) => {
//                   e.preventDefault();
//                   if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//                     const file = e.dataTransfer.files[0];
//                     if (file.type.startsWith("image/")) {
//                       setQuestionImage(file);
//                     }
//                   }
//                 }}
//               >
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 />
//                 <div className={styles.uploadContent}>
//                   <p>Click or drag image here</p>
//                   {questionImage && (
//                     <p className={styles.fileName}>
//                       Selected: {questionImage.name}
//                     </p>
//                   )}
//                 </div>
//               </label>
//             </div>
//           )}
//         </section>

//         {/* Answer Options Section */}
//         <section className={styles.answerSection}>
//           <h2 className={styles.sectionTitle}>Answer Options</h2>

//           {options.map((opt, i) => (
//             <div key={i} className={styles.optionRow}>
//               <div
//                 className={`${styles.optionCheck} ${
//                   opt.checked ? styles.checked : ""
//                 }`}
//               />
//               <span className={styles.optionLetter}>{letters[i]}</span>
//               <input
//                 type="text"
//                 placeholder={`Option ${letters[i]}`}
//                 value={opt.value}
//                 onChange={(e) => handleOptionChange(i, e.target.value)}
//                 onBlur={() => handleBlur(i)}
//                 className={styles.optionInput}
//               />
//               {i >= 4 && (
//                 <button
//                   type="button"
//                   className={styles.removeOptionBtn}
//                   onClick={() => removeOption(i)}
//                 >
//                   <FiX />
//                 </button>
//               )}
//             </div>
//           ))}

//           <button className={styles.addOptionBtn} onClick={addOption}>
//             <FiPlus /> Add Option
//           </button>
//         </section>

//         {/* Explanation Textarea */}
//         <div className={styles.textareaWrapper}>
//           <label>Explanation</label>
//           <textarea
//             value={explanation}
//             onChange={(e) => setExplanation(e.target.value)}
//             placeholder="Enter answer explanation for correct option here..."
//           />
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ManualEntry;

import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiPlus, FiX } from "react-icons/fi";
import styles from "./ManualEntry.module.css";
import QuestionImageIcon from "@/components/IconsAndLogo/QuestionImageIcon";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const ManualEntry = () => {
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [examTypeOpen, setExamTypeOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [question, setQuestion] = useState("");
  const [explanation, setExplanation] = useState("");
  const [points, setPoints] = useState<number | "">("");

  // Image states
  const [includeImage, setIncludeImage] = useState(false);
  const [questionImage, setQuestionImage] = useState<File | null>(null);

  // Answer options
  const [options, setOptions] = useState([
    { value: "", checked: false },
    { value: "", checked: false },
    { value: "", checked: false },
    { value: "", checked: false },
  ]);

  const subjects = ["Mathematics", "Physics", "Chemistry"];
  const examTypes = ["SSCE", "NECO", "WAEC"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setQuestionImage(e.target.files[0]);
    }
  };

  const handleBlur = (index: number) => {
    const newOptions = [...options];
    if (newOptions[index].value.trim() !== "") {
      newOptions[index].checked = true;
    }
    setOptions(newOptions);
  };

  const handleOptionChange = (index: number, val: string) => {
    const newOptions = [...options];
    newOptions[index].value = val;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { value: "", checked: false }]);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSaveDraft = () => {
    // Implement save draft logic here
    alert("Saved as draft!");
  };

  const handlePublish = () => {
    // Implement publish logic here
    alert("Published!");
  };

  return (
    <main className={styles.wrapper}>
      <div>
        <h1 className={styles.pageTitle}>Add New Question</h1>

        {/* Dropdowns */}
        <div className={styles.dropdownRow}>
          <div
            className={styles.customDropdown}
            onClick={() => setSubjectOpen(!subjectOpen)}
          >
            <label>Subject</label>
            <div className={styles.selected}>
              {selectedSubject || "Select Subject"}
              {subjectOpen ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {subjectOpen && (
              <div className={styles.options}>
                {subjects.map((sub) => (
                  <div
                    key={sub}
                    className={styles.option}
                    onClick={() => {
                      setSelectedSubject(sub);
                      setSubjectOpen(false);
                    }}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className={styles.customDropdown}
            onClick={() => setExamTypeOpen(!examTypeOpen)}
          >
            <label>Exam Type</label>
            <div className={styles.selected}>
              {selectedExamType || "Select Exam Type"}
              {examTypeOpen ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {examTypeOpen && (
              <div className={styles.options}>
                {examTypes.map((type) => (
                  <div
                    key={type}
                    className={styles.option}
                    onClick={() => {
                      setSelectedExamType(type);
                      setExamTypeOpen(false);
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Question Textarea */}
        <div className={styles.textareaWrapper}>
          <label>Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter question here..."
          />
        </div>

        {/* Image upload section */}
        <section className={styles.imageSection}>
          <div className={styles.checkRow}>
            <label className={styles.customCheckbox}>
              <input
                type="checkbox"
                checked={includeImage}
                onChange={(e) => setIncludeImage(e.target.checked)}
              />
              <span className={styles.checkmark}></span>
              <QuestionImageIcon className={styles.imageIcon} />
              <span className={styles.checkLabel}>Include Image/Diagram</span>
            </label>
          </div>

          {includeImage && (
            <div className={styles.uploadWrapper}>
              <label
                className={styles.uploadBox}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    const file = e.dataTransfer.files[0];
                    if (file.type.startsWith("image/")) {
                      setQuestionImage(file);
                    }
                  }
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className={styles.uploadContent}>
                  <p>Click or drag image here</p>
                  {questionImage && (
                    <p className={styles.fileName}>
                      Selected: {questionImage.name}
                    </p>
                  )}
                </div>
              </label>
            </div>
          )}
        </section>

        {/* Answer Options Section */}
        <section className={styles.answerSection}>
          <h2 className={styles.sectionTitle}>Answer Options</h2>

          {options.map((opt, i) => (
            <div key={i} className={styles.optionRow}>
              <div
                className={`${styles.optionCheck} ${
                  opt.checked ? styles.checked : ""
                }`}
              />
              <span className={styles.optionLetter}>{letters[i]}</span>
              <input
                type="text"
                placeholder={`Option ${letters[i]}`}
                value={opt.value}
                onChange={(e) => handleOptionChange(i, e.target.value)}
                onBlur={() => handleBlur(i)}
                className={styles.optionInput}
              />
              {i >= 4 && (
                <button
                  type="button"
                  className={styles.removeOptionBtn}
                  onClick={() => removeOption(i)}
                >
                  <FiX />
                </button>
              )}
            </div>
          ))}

          <button className={styles.addOptionBtn} onClick={addOption}>
            <FiPlus /> Add Option
          </button>
        </section>

        {/* Explanation Textarea */}
        <div className={styles.textareaWrapper}>
          <label>Explanation</label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Enter explanation here..."
          />
        </div>

        {/* Point Input */}
        <div className={styles.pointWrapper}>
          <label>Point</label>
          <input
            type="number"
            value={points}
            onChange={(e) =>
              setPoints(e.target.value === "" ? "" : Number(e.target.value))
            }
            className={styles.pointInput}
            placeholder="Point"
          />
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button
            className={styles.saveDraftBtn}
            onClick={handleSaveDraft}
            type="button"
          >
            Save as Draft
          </button>
          <button
            className={styles.publishBtn}
            onClick={handlePublish}
            type="button"
          >
            Publish
          </button>
        </div>
      </div>
    </main>
  );
};

export default ManualEntry;
