import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;
const TestAtoms = Loadable({
  loader: () => import("./TestAtoms"),
  loading: () => <Loading />
});

const ApplicationNoContainer = Loadable({
  loader: () => import("./applicationNumber"),
  loading: () => <Loading />
});
const PropertyIdContainer = Loadable({
  loader: () => import("./propertyId"),
  loading: () => <Loading />
});

const Checkbox = Loadable({
  loader: () => import("./Checkbox"),
  loading: () => <Loading />
});

const MapLocation = Loadable({
  loader: () => import("./MapLocation"),
  loading: () => <Loading />
});

const AutoSuggest = Loadable({
  loader: () => import("./AutoSuggest"),
  loading: () => <Loading />
});

const Asteric = Loadable({
  loader: () => import("./Asteric"),
  loading: () => <Loading />
});

const MenuButton = Loadable({
  loader: () => import("./MenuButton"),
  loading: () => <Loading />
});

const FireNocIcon = Loadable({
  loader: () => import("./Icons/FireNocIcon"),
  loading: () => <Loading />
});

const BreadCrumbs = Loadable({
  loader: () => import("./BreadCrumbs"),
  loading: () => <Loading />
});

const MyApplicationIcon = Loadable({
  loader: () => import("./Icons/MyApplicationIcon"),
  loading: () => <Loading />
});
const pdfHeader = Loadable({
  loader: () => import("./pdfHeader"),
  loading: () => <Loading />
});
const Button = Loadable({
  loader: () => import("./Button"),
  loading: () => <Loading />
});
const Icon = Loadable({
  loader: () => import("./Icon"),
  loading: () => <Loading />
});
export {
  TestAtoms,
  ApplicationNoContainer,
  Checkbox,
  BreadCrumbs,
  MapLocation,
  AutoSuggest,
  Asteric,
  Icon,
  MenuButton,
  FireNocIcon,
  MyApplicationIcon,
  PropertyIdContainer,
  pdfHeader,
  Button
};
