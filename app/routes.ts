import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("exam/:licenseType", "routes/exam.tsx"),
  route("result", "routes/result.tsx"),
] satisfies RouteConfig;
