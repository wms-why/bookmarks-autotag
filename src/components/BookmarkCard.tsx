import React from "react";
import {
  BookmarkCard as StyledBookmarkCard,
  BookmarkIcon,
  BookmarkTitle,
  BookmarkUrl,
  FolderItemIcon,
  BookmarkItemIcon,
  FolderCard,
  
} from "./StyledComponents";

const BookmarkCard = ({ title, url, isFolder, onClick }) => {
  if (isFolder) {
    return (
      <FolderCard onClick={onClick}>
        <BookmarkIcon>
          <FolderItemIcon />
        </BookmarkIcon>
        <BookmarkTitle>{title}</BookmarkTitle>
      </FolderCard>
    );
  }

  const favicon = `https://www.google.com/s2/favicons?domain=${
    new URL(url).hostname
  }&sz=64`;

  const [faviconLoaded, setFaviconLoaded] = React.useState(true);

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => setFaviconLoaded(true);
    img.onerror = () => setFaviconLoaded(false);
    img.src = favicon;
  }, [favicon]);

  return (
    <StyledBookmarkCard>
      <BookmarkIcon>
        {faviconLoaded ? (
          <img src={favicon} alt={title} />
        ) : (
          <BookmarkItemIcon />
        )}
      </BookmarkIcon>
      <BookmarkTitle>{title}</BookmarkTitle>
      <BookmarkUrl>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {new URL(url).hostname}
        </a>
      </BookmarkUrl>
    </StyledBookmarkCard>
  );
};

export default BookmarkCard;