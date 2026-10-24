"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getServiceByIdAction,
  getCategoriesAction,
  createServiceAction,
  updateServiceAction,
} from "@/lib/actions/services";

import type {
  Service,
  ServiceCategory,
  ServiceInput,
} from "@/components/technician/services/serviceTypes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ServiceFormProps {
  serviceId?: string;
}

function extractCategories(result: unknown): ServiceCategory[] {
  if (!result || typeof result !== "object") {
    return [];
  }

  const response = result as Record<string, unknown>;

  // API সরাসরি array দিলে
  if (Array.isArray(result)) {
    return result as ServiceCategory[];
  }

  const data = response.data;

  // data সরাসরি array হলে
  if (Array.isArray(data)) {
    return data as ServiceCategory[];
  }

  // data object-এর ভেতরে category list খোঁজা
  if (data && typeof data === "object") {
    const nested = data as Record<string, unknown>;

    for (const key of ["serviceCategories", "categories", "items"]) {
      if (Array.isArray(nested[key])) {
        return nested[key] as ServiceCategory[];
      }
    }
  }

  // response-এর root-এ category list থাকলে
  for (const key of ["serviceCategories", "categories", "items"]) {
    if (Array.isArray(response[key])) {
      return response[key] as ServiceCategory[];
    }
  }

  return [];
}

function extractService(result: unknown): Service {
  if (!result || typeof result !== "object") {
    throw new Error("Service-এর তথ্য পাওয়া যায়নি।");
  }

  const response = result as {
    success?: boolean;
    message?: string;
    data?: unknown;
  };

  if (response.success === false) {
    throw new Error(response.message || "Service লোড করা যায়নি।");
  }

  const service =
    response.data && typeof response.data === "object" ? response.data : result;

  if (
    !("title" in service) ||
    !("categoryId" in service) ||
    !("price" in service)
  ) {
    throw new Error("Service response-এর format সঠিক নয়।");
  }

  return service as Service;
}

export default function ServiceForm({ serviceId }: ServiceFormProps) {
  const router = useRouter();

  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function initialize() {
      setLoading(true);
      setError("");

      try {
        const categoryResult = await getCategoriesAction();
        if (!active) return;

        const categoryData = extractCategories(categoryResult);

        setCategories(categoryData);
        if (serviceId) {
          const serviceResult = await getServiceByIdAction(serviceId);

          if (!active) return;

          const service = extractService(serviceResult);

          setTitle(service.title);
          setDescription(service.description ?? "");
          setCategoryId(service.categoryId);
          setPrice(String(service.price));
        } else if (categoryData.length > 0) {
          setCategoryId(categoryData[0].id);
        }

        if (categoryData.length === 0) {
          setError(
            "কোনো Category পাওয়া যায়নি। Categories API response পরীক্ষা করুন।",
          );
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "তথ্য লোড করা যায়নি।");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void initialize();

    return () => {
      active = false;
    };
  }, [serviceId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Service Title লিখুন।");
      return;
    }

    if (!categoryId) {
      setError("একটি Category নির্বাচন করুন।");
      return;
    }

    if (price.trim() === "") {
      setError("Price লিখুন।");
      return;
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      setError("সঠিক Price লিখুন।");
      return;
    }

    const payload: ServiceInput = {
      title: title.trim(),
      description: description.trim(),
      categoryId,
      price: numericPrice,
    };

    try {
      setSaving(true);

      const result = serviceId
        ? await updateServiceAction(serviceId, payload)
        : await createServiceAction(payload);

      if (
        result &&
        typeof result === "object" &&
        "success" in result &&
        result.success === false
      ) {
        const message =
          "message" in result && typeof result.message === "string"
            ? result.message
            : "Service Save করা যায়নি।";

        throw new Error(message);
      }

      router.push("/dashboard/technician/services");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Service Save করা যায়নি।");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Service Form লোড হচ্ছে...
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-4 sm:p-6">
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {serviceId ? "Edit Service" : "Create Service"}
          </CardTitle>
          <CardDescription>তোমার Service-এর তথ্য পূরণ করো।</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div
                role="alert"
                className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
              >
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Service Title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="যেমন: AC Repair Service"
                maxLength={255}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Service সম্পর্কে বিস্তারিত লিখুন..."
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>

              <Select
                value={categoryId}
                onValueChange={(value) => {
                  setCategoryId(value ?? "");
                }}
                disabled={categories.length === 0}
              >
                <SelectTrigger id="category" className="w-full">
                  <span className="truncate text-left">
                    {categories.find((category) => category.id === categoryId)
                      ?.name ?? "Category নির্বাচন করুন"}
                  </span>
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="যেমন: 500"
                required
              />
              <p className="text-xs text-muted-foreground">
                Service-এর মূল্য লিখুন।
              </p>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={saving}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={saving || categories.length === 0}
              >
                {saving
                  ? "Saving..."
                  : serviceId
                    ? "Update Service"
                    : "Create Service"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
