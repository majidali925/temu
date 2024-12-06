"use client";
import React, { useState } from "react";

const CategorySelector = ({ categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPath, setSelectedPath] = useState([]);
  const [finalSelection, setFinalSelection] = useState([]);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredCategories, setFilteredCategories] = useState();

  console.log({ selectedCategory, selectedPath, filteredCategories });

  const handleCategoryClick = (category, level) => {
    if (category?.children?.length > 0) {
      // Update the selected path up to the current level
      setSelectedPath((prev) => [...prev.slice(0, level), category]);
    } else {
      // Select the current category (leaf node)
      setSelectedCategory(category);
    }
  };

  const handleSearch = (event) => {
    const search = event.target.value.toLowerCase();
    setSearchTerm(search);

    if (search.trim() === "") {
      setFilteredCategories([]);
    } else {
      const searchResults = [];
      const recursiveSearch = (items, path = []) => {
        items.forEach((item) => {
          const fullPath = [...path, item];
          if (item.categoryName.toLowerCase().includes(search)) {
            searchResults.push({ item, path: fullPath });
          }
          if (item.children) {
            recursiveSearch(item.children, fullPath);
          }
        });
      };
      recursiveSearch(categories);
      setFilteredCategories(searchResults);
    }
  };

  // Select category from search results
  const handleSearchSelect = (searchResult) => {
    setSelectedCategory(searchResult.item);
    setFilteredCategories([]);
    setSearchTerm("");
    setSelectedPath(searchResult.path);
  };

  // Cancel the selection, closing the popover
  const handleCancel = () => {
    setPopoverVisible(false);
  };

  // Confirm the selection and close the popover
  const handleConfirm = () => {
    setFinalSelection([...selectedPath, selectedCategory]);
    setPopoverVisible(false);
  };
  const renderCategories = (categories, level = 0) => {
    return (
      <div className="category-level" style={{ marginLeft: level * 1 }}>
        {categories.map((category) => (
          <div
            key={category.categoryName}
            onClick={() => handleCategoryClick(category, level)}
            style={{
              padding: "5px 10px",
              cursor: "pointer",
              backgroundColor:
                selectedCategory.categoryName === category.categoryName
                  ? "#d3f3ff"
                  : "transparent",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label>{category.categoryName}</label>
              {category.children.length > 0 && <span>{">"}</span>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  console.log({ finalSelection });

  return (
    <div className="category-selector">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search category"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setPopoverVisible(true)}
        />
        {filteredCategories.length > 0 && (
          <div className="search-results">
            {filteredCategories.map(({ item, path }, index) => (
              <div
                key={index}
                className="search-result"
                onClick={() => handleSearchSelect({ item, path })}
              >
                {path.map((p) => p.categoryName).join(" > ")}
              </div>
            ))}
          </div>
        )}
        {popoverVisible && (
          <div className="popover">
            <div className="categories-container">
              {categories && renderCategories(categories)}{" "}
              {/* Render top-level categories */}
              {selectedPath.map((category, level) =>
                category?.children?.length > 0
                  ? renderCategories(category.children, level + 1)
                  : null
              )}
            </div>
            <div className="popover-buttons">
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleConfirm} className="confirm-btn">
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>

      {finalSelection.length > 0 && (
        <div className="selected-path">
          <strong>Current selection:</strong>{" "}
          {finalSelection.map((cat) => cat.categoryName).join(" > ")}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
