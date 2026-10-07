import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type Path = string;
type Data = unknown;

export const authHeader = async (): Promise<Record<string, string>> => {
  const token = await getUserToken();
  const header: Record<string, string> = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
  return header;
};

export const serverFetch = async (path: Path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return handleStatusCode(res);
};

export const protectedFetch = async (path: Path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: await authHeader(),
  });

  // handle 401, 403

  return handleStatusCode(res);
};

export const serverMutation = async (
  path: Path,
  data: Data,
  method = "POST",
) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });

  return handleStatusCode(res);
};

// handle 401, 404, 403
const handleStatusCode = async (res: Response) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  } else if (res.status === 403) {
    redirect("/forbidden");
  }
  const result = await res.json();
  return result;
};
