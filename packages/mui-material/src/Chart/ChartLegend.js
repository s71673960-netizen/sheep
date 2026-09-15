'use client';
import * as React from 'react';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import SvgIcon from '../SvgIcon';

const LegendRoot = styled('div', {
  name: 'MuiChartLegend',
  slot: 'Root',
})({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  paddingTop: 0,
  minWidth: 0,
});

const LegendScrollContainer = styled('div', {
  name: 'MuiChartLegend',
  slot: 'ScrollContainer',
})({
  overflow: 'hidden',
  display: 'flex',
  flexWrap: 'nowrap',
  gap: 16,
  scrollBehavior: 'smooth',
});

const LegendItem = styled('div', {
  name: 'MuiChartLegend',
  slot: 'Item',
})({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
  cursor: 'pointer',
  transition: 'opacity 0.2s',
  '&:hover': { opacity: 0.7 },
});

const LegendSymbol = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  position: 'relative',
  width: 20,
  height: 10,
});

const LegendLabel = styled('span')({
  fontSize: 12,
  whiteSpace: 'nowrap',
});

const ArrowButton = styled('button')(
  memoTheme(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    border: 'none',
    color: (theme.vars || theme).palette.text.secondary,
    background: 'none',
    cursor: 'pointer',
    padding: 0,
    flexShrink: 0,
    borderRadius: '50%',
    '&:hover': { backgroundColor: (theme.vars || theme).palette.action.hover },
    '&:disabled': { opacity: 0.3, cursor: 'default', backgroundColor: 'transparent' },
  })),
);

function LeftArrowIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24" sx={{ fontSize: 16 }}>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </SvgIcon>
  );
}

function RightArrowIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24" sx={{ fontSize: 16 }}>
      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
    </SvgIcon>
  );
}

const ChartLegend = React.forwardRef(function ChartLegend(props, ref) {
  const { series, onToggle, hiddenIndices, chartType } = props;
  const scrollRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const useSquareMarker = chartType === 'bar' || chartType === 'pie' || chartType === 'donut';

  const updateScrollState = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  React.useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    return () => observer.disconnect();
  }, [series, updateScrollState]);

  const scroll = React.useCallback((direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  }, []);

  if (!series || series.length === 0) return null;

  const needsScroll = canScrollLeft || canScrollRight;

  return (
    <LegendRoot ref={ref}>
      {needsScroll && (
        <ArrowButton
          onClick={() => scroll('left')}
          style={{ visibility: canScrollLeft ? 'visible' : 'hidden' }}
        >
          <LeftArrowIcon />
        </ArrowButton>
      )}
      <LegendScrollContainer ref={scrollRef} onScroll={updateScrollState}>
        {series.map((s, i) => {
          if (s.name === 'base') return null;
          const color = s.itemStyle?.color || s.lineStyle?.color || '#999';
          const isHidden = hiddenIndices.has(i);
          return (
            <LegendItem
              key={i}
              onClick={() => onToggle(i)}
              style={{ opacity: isHidden ? 0.35 : 1 }}
            >
              <LegendSymbol>
                {useSquareMarker ? (
                  <span style={{
                    display: 'inline-block',
                    width: 12,
                    height: 12,
                    borderRadius: 2,
                    backgroundColor: color,
                  }} />
                ) : (
                  <>
                    <span style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      right: 0,
                      height: 2,
                      backgroundColor: color,
                      transform: 'translateY(-50%)',
                    }} />
                    <span style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: color,
                      transform: 'translate(-50%, -50%)',
                    }} />
                  </>
                )}
              </LegendSymbol>
              <LegendLabel style={{ color: color }}>{s.name || `Series ${i + 1}`}</LegendLabel>
            </LegendItem>
          );
        })}
      </LegendScrollContainer>
      {needsScroll && (
        <ArrowButton
          onClick={() => scroll('right')}
          style={{ visibility: canScrollRight ? 'visible' : 'hidden' }}
        >
          <RightArrowIcon />
        </ArrowButton>
      )}
    </LegendRoot>
  );
});

export default ChartLegend;
