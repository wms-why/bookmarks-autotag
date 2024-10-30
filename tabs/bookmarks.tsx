import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

const Container = styled.div`
  display: flex;
  background-color: #f3f0ff;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  width:1440px;
  margin: 0 auto;
  
`;

function bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarFolders, setSidebarFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  useEffect(() => {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      setBookmarks(bookmarkTreeNodes);
      setSidebarFolders(bookmarkTreeNodes[0]?.children || []);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (currentFolder) {
      setSelectedFolderId(currentFolder.id);
    } else {
      setSelectedFolderId(null);
    }
  }, [currentFolder]);

  const handleFolderClick = (folder) => {
    setCurrentFolder(folder);
    toggleFolder(folder.id, true);
  };

  const toggleFolder = (folderId, forceExpand = false) => {
    // Find all parent folder IDs
    const findParentFolders = (nodes, targetId, parents = []) => {
      for (let node of nodes) {
        if (node.children) {
          if (node.children.some(child => child.id === targetId)) {
            parents.push(node.id);
          }
          findParentFolders(node.children, targetId, parents);
        }
      }
      return parents;
    };
  
    const parentFolders = findParentFolders(sidebarFolders, folderId);
  
    setExpandedFolders((prev) => {
      const newState = { ...prev };
      // Expand all parent folders
      parentFolders.forEach(parentId => {
        newState[parentId] = true;
      });
      // Set the target folder's state
      newState[folderId] = forceExpand ? true : !prev[folderId];
      return newState;
    });
      
    // ... existing findFolder code ...
    const findFolder = (nodes) => {
      for (let node of nodes) {
        if (node.id === folderId) {
          setCurrentFolder(node);
          return;
        }
        if (node.children) {
          findFolder(node.children);
        }
      }
    };
    findFolder(sidebarFolders);
  };

  return (
    <Container>
      <ContentWrapper>
        <Sidebar
          sidebarFolders={sidebarFolders}
        expandedFolders={expandedFolders}
        toggleFolder={toggleFolder}
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
      />
      <MainContent
        currentFolder={currentFolder}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        bookmarks={bookmarks}
        isLoading={isLoading}
        setCurrentFolder={handleFolderClick}
        />
      </ContentWrapper>
    </Container>
  );
}

export default bookmarks;