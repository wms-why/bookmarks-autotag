import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../src/components/Sidebar";
import MainContent from "../src/MainContent";

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

function BookmarksPage() {
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
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
    // Find the clicked folder and set it as the current folder
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
        setCurrentFolder={setCurrentFolder}
        />
      </ContentWrapper>
    </Container>
  );
}

export default BookmarksPage;