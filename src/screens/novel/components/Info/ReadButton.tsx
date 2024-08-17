import React from 'react';

import { Button } from '@components';
import { getString } from '@strings/translations';
import { ChapterInfo } from '@database/types';
import { useAppSettings } from '@hooks/persisted';

interface ReadButtonProps {
  chapters: ChapterInfo[];
  lastRead?: ChapterInfo;
  navigateToChapter: (chapter: ChapterInfo) => void;
}

const ReadButton = ({
  chapters,
  lastRead,
  navigateToChapter,
}: ReadButtonProps) => {
  const { useFabForContinueReading = false } = useAppSettings();

  const readFirstChapter = () => {
    return (
      chapters[0].chapterNumber! <= chapters[chapters.length - 1].chapterNumber!
    );
  };
  const navigateToLastReadChapter = () => {
    if (lastRead) {
      navigateToChapter(lastRead);
    } else if (chapters.length) {
      readFirstChapter()
        ? navigateToChapter(chapters[0])
        : navigateToChapter(chapters[chapters.length - 1]);
    }
  };

  if (!useFabForContinueReading) {
    return chapters.length > 0 ? (
      <Button
        title={
          lastRead
            ? `${getString('novelScreen.continueReading')} ${lastRead.name}`
            : getString('novelScreen.startReadingChapters', {
                name: readFirstChapter()
                  ? chapters[0].name
                  : chapters[chapters.length - 1].name,
              })
        }
        style={{ margin: 16 }}
        onPress={navigateToLastReadChapter}
        mode="contained"
      />
    ) : null;
  } else {
    return null;
  }
};

export default ReadButton;
