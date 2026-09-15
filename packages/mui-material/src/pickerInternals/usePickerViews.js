'use client';
import * as React from 'react';

export default function usePickerViews({ views = ['day'], openTo, onChange }) {
  const [activeView, setActiveView] = React.useState(openTo || views[0]);

  const handleViewChange = React.useCallback(
    (newView) => {
      setActiveView(newView);
    },
    [],
  );

  const goToNextView = React.useCallback(() => {
    const currentIndex = views.indexOf(activeView);
    if (currentIndex < views.length - 1) {
      setActiveView(views[currentIndex + 1]);
    }
  }, [views, activeView]);

  const goToPreviousView = React.useCallback(() => {
    const currentIndex = views.indexOf(activeView);
    if (currentIndex > 0) {
      setActiveView(views[currentIndex - 1]);
    }
  }, [views, activeView]);

  return {
    activeView,
    setActiveView: handleViewChange,
    goToNextView,
    goToPreviousView,
    views,
  };
}
