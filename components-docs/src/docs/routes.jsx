import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const OverviewDoc = lazy(() => import('./pages/OverviewDoc'));
const ButtonDoc = lazy(() => import('./pages/components/ButtonDoc'));
const IconDoc = lazy(() => import('./pages/components/IconDoc'));
const FlexDoc = lazy(() => import('./pages/components/FlexDoc'));
const GridDoc = lazy(() => import('./pages/components/GridDoc'));
const SpaceDoc = lazy(() => import('./pages/components/SpaceDoc'));
const LayoutDoc = lazy(() => import('./pages/components/LayoutDoc'));
const SplitterDoc = lazy(() => import('./pages/components/SplitterDoc'));
const ScrollbarDoc = lazy(() => import('./pages/components/ScrollbarDoc'));
const DividerDoc = lazy(() => import('./pages/components/DividerDoc'));
const InputDoc = lazy(() => import('./pages/components/InputDoc'));
const SelectDoc = lazy(() => import('./pages/components/SelectDoc'));
const AutocompleteDoc = lazy(() => import('./pages/components/AutocompleteDoc'));
const CheckboxDoc = lazy(() => import('./pages/components/CheckboxDoc'));
const RadioDoc = lazy(() => import('./pages/components/RadioDoc'));
const SwitchDoc = lazy(() => import('./pages/components/SwitchDoc'));
const SliderDoc = lazy(() => import('./pages/components/SliderDoc'));
const RatingDoc = lazy(() => import('./pages/components/RatingDoc'));
const ToggleButtonDoc = lazy(() => import('./pages/components/ToggleButtonDoc'));
const DatePickerDoc = lazy(() => import('./pages/components/DatePickerDoc'));
const TimePickerDoc = lazy(() => import('./pages/components/TimePickerDoc'));
const TableDoc = lazy(() => import('./pages/components/TableDoc'));
const ListDoc = lazy(() => import('./pages/components/ListDoc'));
const CardDoc = lazy(() => import('./pages/components/CardDoc'));
const ChipDoc = lazy(() => import('./pages/components/ChipDoc'));
const AvatarDoc = lazy(() => import('./pages/components/AvatarDoc'));
const TooltipDoc = lazy(() => import('./pages/components/TooltipDoc'));
const TabsDoc = lazy(() => import('./pages/components/TabsDoc'));
const BreadcrumbsDoc = lazy(() => import('./pages/components/BreadcrumbsDoc'));
const MenuDoc = lazy(() => import('./pages/components/MenuDoc'));
const PaginationDoc = lazy(() => import('./pages/components/PaginationDoc'));
const StepperDoc = lazy(() => import('./pages/components/StepperDoc'));
const DrawerDoc = lazy(() => import('./pages/components/DrawerDoc'));
const DialogDoc = lazy(() => import('./pages/components/DialogDoc'));
const AlertDoc = lazy(() => import('./pages/components/AlertDoc'));
const SnackbarDoc = lazy(() => import('./pages/components/SnackbarDoc'));
const ProgressDoc = lazy(() => import('./pages/components/ProgressDoc'));
const SkeletonDoc = lazy(() => import('./pages/components/SkeletonDoc'));
const StatusDotDoc = lazy(() => import('./pages/components/StatusDotDoc'));
const SpinDoc = lazy(() => import('./pages/components/SpinDoc'));
const ChartDoc = lazy(() => import('./pages/components/ChartDoc'));
const ProductionCalendarDoc = lazy(() => import('./pages/components/ProductionCalendarDoc'));
const UploadDoc = lazy(() => import('./pages/components/UploadDoc'));
const TreeDoc = lazy(() => import('./pages/components/TreeDoc'));
const FormDoc = lazy(() => import('./pages/components/FormDoc'));
const StatisticDoc = lazy(() => import('./pages/components/StatisticDoc'));

export const routes = [
  { path: '/', element: <OverviewDoc /> },
  { path: '/components', element: <OverviewDoc /> },
  // 通用
  { path: '/components/button', element: <ButtonDoc /> },
  { path: '/components/icon', element: <IconDoc /> },
  // 布局
  { path: '/components/flex', element: <FlexDoc /> },
  { path: '/components/grid', element: <GridDoc /> },
  { path: '/components/space', element: <SpaceDoc /> },
  { path: '/components/layout', element: <LayoutDoc /> },
  { path: '/components/splitter', element: <SplitterDoc /> },
  { path: '/components/scrollbar', element: <ScrollbarDoc /> },
  { path: '/components/divider', element: <DividerDoc /> },
  // 导航
  { path: '/components/tabs', element: <TabsDoc /> },
  { path: '/components/breadcrumbs', element: <BreadcrumbsDoc /> },
  { path: '/components/menu', element: <MenuDoc /> },
  { path: '/components/pagination', element: <PaginationDoc /> },
  { path: '/components/stepper', element: <StepperDoc /> },
  { path: '/components/drawer', element: <DrawerDoc /> },
  // 数据录入
  { path: '/components/input', element: <InputDoc /> },
  { path: '/components/select', element: <SelectDoc /> },
  { path: '/components/autocomplete', element: <AutocompleteDoc /> },
  { path: '/components/checkbox', element: <CheckboxDoc /> },
  { path: '/components/radio', element: <RadioDoc /> },
  { path: '/components/switch', element: <SwitchDoc /> },
  { path: '/components/slider', element: <SliderDoc /> },
  { path: '/components/rating', element: <RatingDoc /> },
  { path: '/components/togglebutton', element: <ToggleButtonDoc /> },
  { path: '/components/capsuletabs', element: <Navigate to="/components/tabs" replace /> },
  { path: '/components/outlinedtabs', element: <Navigate to="/components/tabs" replace /> },
  { path: '/components/datepicker', element: <DatePickerDoc /> },
  { path: '/components/timepicker', element: <TimePickerDoc /> },
  { path: '/components/form', element: <FormDoc /> },
  // 数据展示
  { path: '/components/table', element: <TableDoc /> },
  { path: '/components/list', element: <ListDoc /> },
  { path: '/components/card', element: <CardDoc /> },
  { path: '/components/chip', element: <ChipDoc /> },
  { path: '/components/avatar', element: <AvatarDoc /> },
  { path: '/components/tooltip', element: <TooltipDoc /> },
  { path: '/components/tree', element: <TreeDoc /> },
  { path: '/components/statistic', element: <StatisticDoc /> },
  // 反馈
  { path: '/components/alert', element: <AlertDoc /> },
  { path: '/components/dialog', element: <DialogDoc /> },
  { path: '/components/snackbar', element: <SnackbarDoc /> },
  { path: '/components/progress', element: <ProgressDoc /> },
  { path: '/components/skeleton', element: <SkeletonDoc /> },
  { path: '/components/spin', element: <SpinDoc /> },
  // 图表
  { path: '/components/chart', element: <ChartDoc /> },
  // 扩展组件
  { path: '/components/status-dot', element: <StatusDotDoc /> },
  { path: '/components/production-calendar', element: <ProductionCalendarDoc /> },
  { path: '/components/upload', element: <UploadDoc /> },
  { path: '*', element: <Navigate to="/" replace /> },
];
