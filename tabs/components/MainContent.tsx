import React from "react";
import { SearchIcon } from "./Icons";
import BookmarkCard from "./BookmarkCard";
import {
  MainContent as StyledMainContent,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  SearchBar,
  BookmarkList,
  FolderSection,
  BookmarkSection,
  FolderCardList,
  FolderCard,
  Divider
} from "./StyledComponents";

const MainContent = ({
  currentFolder,
  searchTerm,
  setSearchTerm,
  bookmarks,
  isLoading,
  setCurrentFolder,
}) => {
  const filteredBookmarks = currentFolder
    ? currentFolder.children
    : bookmarks[0]?.children || [];

  const searchedBookmarks = filteredBookmarks.filter((bookmark) => {
    return (
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bookmark.url &&
        bookmark.url.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const renderFolderItem = (folder) => {
    if (!folder.url) {
      return (
        <BookmarkCard
          key={folder.id}
          onClick={() => setCurrentFolder(folder)}
          isFolder={true}
          title={folder.title}
          url={folder.url}
        />
      );
    }
    return null;
  };

  const generateBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentNode = currentFolder;
  
    const findParent = (node, targetId) => {
      if (node.children) {
        for (const child of node.children) {
          if (child.id === targetId) {
            return node;
          }
          const result = findParent(child, targetId);
          if (result) return result;
        }
      }
      return null;
    };
  
    while (currentNode) {
      breadcrumbs.unshift(currentNode);
      currentNode = findParent(bookmarks[0], currentNode.id);
    }
      console.log("🚀 ~ generateBreadcrumbs ~ breadcrumbs:", breadcrumbs)
  
    return breadcrumbs;
  };

  return (
    <StyledMainContent>
      <Breadcrumb>
        {currentFolder ? generateBreadcrumbs().map((folder, index) => (
          <React.Fragment key={folder.id}>
            {index > 0 && <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>}
            <BreadcrumbItem
              onClick={() => setCurrentFolder(index === generateBreadcrumbs().length - 1 ? folder : folder)}
            >
              {folder.title||'书签'}
            </BreadcrumbItem>
          </React.Fragment>
        )) : <BreadcrumbItem
        onClick={() => null}
      >
        {'书签'}
      </BreadcrumbItem>}
      </Breadcrumb>
      <SearchBar>
        <SearchIcon />
        <input
          type="text"
          placeholder="搜索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>
      {isLoading ? (
        <p>加载中...</p>
      ) : (
        <>
          {searchedBookmarks.filter((item) => !item.url).length > 0 && (
            <FolderSection>
              {/* <h3>文件夹</h3> */}
              <FolderCardList>
                {searchedBookmarks.filter((item) => !item.url).map(renderFolderItem)}
              </FolderCardList>
            </FolderSection>
          )}
          <Divider />
          <BookmarkSection>
            {/* <h3>书签</h3> */}
            <BookmarkList>
              {searchedBookmarks
                .filter((item) => item.url)
                .map((bookmark) => (
                  <BookmarkCard
                    key={bookmark.id}
                    title={bookmark.title}
                    url={bookmark.url}
                    onClick={() => setCurrentFolder(bookmark)}
                    isFolder={false}
                  />
                ))}
            </BookmarkList>
          </BookmarkSection>
        </>
      )}
    </StyledMainContent>
  );
};

export default MainContent;