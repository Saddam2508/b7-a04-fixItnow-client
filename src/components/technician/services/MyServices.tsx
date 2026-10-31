"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import {
  getMyServicesAction,
  deleteServiceAction,
} from "@/lib/actions/services";

import type { Service } from "./serviceTypes";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  BriefcaseBusiness,
  Loader2,
} from "lucide-react";

function extractServices(result: unknown): Service[] {
  if (!result || typeof result !== "object") return [];

  const response = result as Record<string, unknown>;

  if (response.success === false) {
    throw new Error(
      typeof response.message === "string"
        ? response.message
        : "Services লোড করা যায়নি।",
    );
  }

  const data = response.data;

  if (Array.isArray(data)) {
    return data as Service[];
  }

  if (data && typeof data === "object") {
    const nested = data as Record<string, unknown>;

    for (const key of ["services", "myServices", "technicianServices"]) {
      if (Array.isArray(nested[key])) {
        return nested[key] as Service[];
      }
    }
  }

  return [];
}

export default function MyServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Manual Refresh Function
  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getMyServicesAction();

      const serviceList = extractServices(result);

      setServices(serviceList);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Services লোড করা যায়নি.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial Data Loading
  useEffect(() => {
    let active = true;

    async function loadServices() {
      try {
        const result = await getMyServicesAction();

        if (!active) return;

        const serviceList = extractServices(result);

        setServices(serviceList);
        setError("");
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Services লোড করা যায়নি.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadServices();

    return () => {
      active = false;
    };
  }, []);

  async function handleDelete() {
    if (!selectedService) return;

    try {
      setDeleting(true);
      setError("");

      const result = await deleteServiceAction(selectedService.id);

      if (
        result &&
        typeof result === "object" &&
        "success" in result &&
        result.success === false
      ) {
        const message =
          "message" in result && typeof result.message === "string"
            ? result.message
            : "Service Delete করা যায়নি।";

        throw new Error(message);
      }

      setServices((previous) =>
        previous.filter((service) => service.id !== selectedService.id),
      );

      setSelectedService(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Service Delete করা যায়নি।",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="w-full space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Services</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            তোমার তৈরি করা সকল Services পরিচালনা করো।
          </p>
        </div>

        <Button>
          <Link href="/dashboard/technician/services/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Service
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Total Services</p>

              <p className="mt-2 text-2xl font-bold">
                {loading ? "..." : services.length}
              </p>
            </div>

            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <BriefcaseBusiness className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Service List</CardTitle>
            <CardDescription>
              তোমার Service-গুলো এখানে দেখতে ও পরিচালনা করতে পারবে।
            </CardDescription>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={fetchServices}
            disabled={loading}
            aria-label="Refresh services"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </CardHeader>

        <CardContent>
          {error && (
            <div
              role="alert"
              className="mb-4 flex flex-col gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive sm:flex-row sm:items-center sm:justify-between"
            >
              <span>{error}</span>

              <Button variant="outline" size="sm" onClick={fetchServices}>
                Try Again
              </Button>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12">
              <Loader2 className="h-7 w-7 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Services লোড হচ্ছে...
              </p>
            </div>
          ) : services.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4">
                <BriefcaseBusiness className="h-8 w-8 text-muted-foreground" />
              </div>

              <h3 className="mt-4 text-lg font-semibold">No Services Found</h3>

              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                এখনো কোনো Service তৈরি করোনি। প্রথম Service তৈরি করে শুরু করো।
              </p>

              <Button className="mt-5">
                <Link href="/dashboard/technician/services/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Service
                </Link>
              </Button>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="min-w-[180px]">
                        <div className="font-medium">{service.title}</div>

                        <p className="mt-1 max-w-[220px] truncate text-xs text-muted-foreground">
                          {service.description || "No description"}
                        </p>
                      </TableCell>

                      <TableCell>
                        <Badge variant="secondary">
                          {service.category?.name || "Uncategorized"}
                        </Badge>
                      </TableCell>

                      <TableCell className="font-medium">
                        ৳{service.price.toLocaleString("en-BD")}
                      </TableCell>

                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                        {service.createdAt
                          ? new Date(service.createdAt).toLocaleDateString(
                              "en-GB",
                            )
                          : "—"}
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label={`Edit ${service.title}`}
                          >
                            <Link
                              href={`/dashboard/technician/services/${service.id}/edit`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>

                          <Button
                            variant="outline"
                            size="icon"
                            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            aria-label={`Delete ${service.title}`}
                            onClick={() => setSelectedService(service)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog
        open={selectedService !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) setSelectedService(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service?</AlertDialogTitle>

            <AlertDialogDescription>
              তুমি কি নিশ্চিত যে <strong>{selectedService?.title}</strong>{" "}
              Service-টি Delete করতে চাও? এই কাজটি আর ফিরিয়ে আনা যাবে না।
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                void handleDelete();
              }}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Service"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
