// import { useState } from "react";
// import PetCards from "./PetCards";
// import { getRecommendation } from "../api/recommendationApi";

// function AdoptionReadiness({ onClose, onViewPets }) {
//   const [space, setSpace] = useState("");
//   const [time, setTime] = useState("");
//   const [experience, setExperience] = useState("");
//   const [score, setScore] = useState(null);
//   const calculateScore = () => {
//     let total = 0;
//     if (space == "house") total += 30;
//     else if (space == "apartment") total += 20;

//     //time
//     if (time == "high") total += 40;
//     else if (time == "medium") total += 20;
//     else if (time == "low") total += 20;

//     //expe
//     if (experience == "experienced") total += 30;
//     else if (experience == "some") total += 20;
//     else if (experience == "none") total += 10;
//     setScore(total);
//   };
//   const getRecommendedCategories = () => {
//     const categories = [];

//     // Base recommendations (everyone gets these)
//     if (time === "low") {
//       categories.push("low-maintenance", "calm");
//     }

//     if (time === "medium") {
//       categories.push("balanced");
//     }

//     if (time === "high") {
//       categories.push("active");
//     }

//     // Experience adjusts, not dominates
//     if (experience === "experienced" && score >= 75) {
//       categories.push("experienced-only");
//     }

//     // Safety net
//     if (categories.length === 0) {
//       categories.push("low-maintenance");
//     }

//     return [...new Set(categories)];
//   };

//   const getExplanation = () => {
//     const reasons = [];

//     if (space === "apartment") {
//       reasons.push(
//         "You live in an apartment, which may limit space for highly active pets.",
//       );
//     } else if (space === "house") {
//       reasons.push(
//         "You have a house, which provides a better environment for most pets.",
//       );
//     }

//     if (time === "low") {
//       reasons.push("You have limited daily free time for pet care.");
//     } else if (time === "medium") {
//       reasons.push("You have a moderate amount of time to spend with a pet.");
//     } else if (time === "high") {
//       reasons.push("You have ample time to care for and bond with a pet.");
//     }

//     if (experience === "none") {
//       reasons.push("You are a first-time pet adopter.");
//     } else if (experience === "some") {
//       reasons.push("You have some prior experience with pets.");
//     } else if (experience === "experienced") {
//       reasons.push("You are experienced in handling pets.");
//     }

//     return reasons;
//   };

//   return (
//     <div style={overlay}>
//       <div style={modal}>
//         <button style={closeBtn} onClick={onClose}>
//           ✕
//         </button>

//         <h2>Adoption Readiness Check 🐾</h2>
//         <label>Living Space</label>
//         <select
//           style={{ padding: "6px", width: "100%" }}
//           value={space}
//           onChange={(e) => setSpace(e.target.value)}
//         >
//           <option value="">Select</option>
//           <option value="apartment">Apartment</option>
//           <option value="house">House</option>
//         </select>
//         <br></br>

//         <label>Daily Free Time</label>
//         <select
//           style={{ padding: "6px", width: "100%" }}
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//         >
//           <option value="">Select</option>
//           <option value="low">Less than 2 hours</option>
//           <option value="medium">2–4 hours</option>
//           <option value="high">More than 4 hours</option>
//         </select>

//         <br></br>

//         <label>Pet Experience</label>
//         <select
//           style={{ padding: "6px", width: "100%" }}
//           value={experience}
//           onChange={(e) => setExperience(e.target.value)}
//         >
//           <option value="">Select</option>
//           <option value="none">None</option>
//           <option value="some">Some</option>
//           <option value="experienced">Experienced</option>
//         </select>

//         <br></br>
//         <button
//           style={{ marginTop: "20px", marginRight: "10px" }}
//           onClick={calculateScore}
//         >
//           Calculate Readiness
//         </button>

//         {score !== null && (
//           <div style={{ marginTop: "20px" }}>
//             <p>
//               <strong>Your Adoption Readiness Score: {score}%</strong>
//             </p>

//             <h4>Why this score?</h4>
//             <ul>
//               {getExplanation().map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>

//             <h4>What we recommend</h4>

//             <button
//               onClick={async () => {
//                 try {
//                   const data = await getRecommendation({
//                     maintenance:
//                       time === "low"
//                         ? "low"
//                         : time === "high"
//                           ? "high"
//                           : "medium",
//                     energy: time === "high" ? "high" : "low",
//                   });

//                   onViewPets(data.pets);
//                 } catch (err) {
//                   alert("Failed to fetch recommendations");
//                 }
//               }}
//             >
//               View Recommended Pets
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// const overlay = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   backgroundColor: "rgba(0,0,0,0.6)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   zIndex: 1000,
// };

// const modal = {
//   background: "#fff",
//   padding: "2rem",
//   borderRadius: "10px",
//   width: "90%",
//   maxWidth: "500px",
//   position: "relative",
//   maxHeight: "80vh", // 👈 LIMIT HEIGHT
//   overflowY: "auto",
// };

// const closeBtn = {
//   position: "absolute",
//   top: "10px",
//   right: "15px",
//   border: "none",
//   background: "none",
//   fontSize: "18px",
//   cursor: "pointer",
// };

// export default AdoptionReadiness;

import { useState } from "react";
import { getRecommendations } from "../api/recommendationApi";
import PetCards from "./PetCards";

const AdoptionRecommendation = ({ onClose }) => {
  const [pets, setPets] = useState([]);
  const [lifestyle, setLifestyle] = useState("");
  const [homeType, setHomeType] = useState("");
  const [experience, setExperience] = useState("");
  const [error, setError] = useState("");

  const handleRecommend = async () => {
    if (!lifestyle || !homeType || !experience) {
      setError("Please select all fields before getting recommendations.");
      return;
    }

    const userData = {
      lifestyle: Number(lifestyle),
      home_type: Number(homeType),
      experience: Number(experience),
    };

    const result = await getRecommendations(userData);
    setError("");
    setPets(result);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={{ margin: 0 }}>Adoption Readiness</h2>
        {onClose && (
          <button style={closeButtonStyle} onClick={onClose}>
            Close
          </button>
        )}
      </div>

      <p>See which pets are the best fit for your lifestyle.</p>

      <div style={formStyle}>
        <label style={fieldStyle}>
          <span>Daily activity level</span>
          <select
            value={lifestyle}
            onChange={(event) => setLifestyle(event.target.value)}
            style={selectStyle}
          >
            <option value="">Select</option>
            <option value="0">Mostly relaxed</option>
            <option value="1">Balanced</option>
            <option value="2">Very active</option>
          </select>
        </label>

        <label style={fieldStyle}>
          <span>Home type</span>
          <select
            value={homeType}
            onChange={(event) => setHomeType(event.target.value)}
            style={selectStyle}
          >
            <option value="">Select</option>
            <option value="0">Apartment</option>
            <option value="1">House</option>
          </select>
        </label>

        <label style={fieldStyle}>
          <span>Pet experience</span>
          <select
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
            style={selectStyle}
          >
            <option value="">Select</option>
            <option value="0">First-time adopter</option>
            <option value="1">Experienced</option>
          </select>
        </label>
      </div>

      {error && <p style={errorStyle}>{error}</p>}

      <button onClick={handleRecommend} style={actionButtonStyle}>
        Get Recommendations
      </button>

      <PetCards pets={pets} />
    </div>
  );
};

const containerStyle = {
  margin: "32px auto",
  maxWidth: "960px",
  padding: "24px",
  borderRadius: "16px",
  background: "#fff7ef",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  marginBottom: "12px",
};

const formStyle = {
  display: "grid",
  gap: "16px",
  margin: "20px 0",
};

const fieldStyle = {
  display: "grid",
  gap: "8px",
};

const selectStyle = {
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #d8c7b4",
  background: "#fff",
};

const errorStyle = {
  color: "#b42318",
  margin: "0 0 12px",
};

const actionButtonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "10px 18px",
  cursor: "pointer",
};

const closeButtonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "8px 14px",
  cursor: "pointer",
};

export default AdoptionRecommendation;
