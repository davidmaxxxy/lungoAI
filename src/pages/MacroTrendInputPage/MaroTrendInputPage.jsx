import React from "react";
import FormTableWrapper from "../../components/TableForms/FormTableWrapper";
import axios from "axios";

function MacroTrendInputPage() {
  const headers = [
    { text: "#" },
    { text: "theme" },
    { text: "Theme Desription" },
  ];

  const rows = [["1", "Rising Global Inflation", "Describe the impact here"]];

  const handleFormSubmit = async (e) => {
    const formData = new formData(e.target);
    let rowData = [];

    formData.forEach((value) => rowData.push(value));

    try {
      const response = await axios.post("/api/generate-impact-analysis", {
        data: rowData,
      });

      const data = response.data;
      console.log(`Generated impact analysis:`, data);
    } catch (error) {
      console.error("Error generating impact analysis: ", error);
    }
  };

  return (
    <div className="macro-trend-input-page">
      <FormTableWrapper
        headers={headers}
        rows={rows}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default MacroTrendInputPage;
