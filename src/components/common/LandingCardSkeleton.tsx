"use client";

import { Card, CardHeader, CardBody, CardFooter, Skeleton, Divider } from "@heroui/react";

export default function LandingCardkeleton() {
  return (
    <Card className="min-w-[375px] min-h-[511px] p-4 space-y-5 rounded-lg shadow-md">
      {/* Image Skeleton */}
      <CardHeader className="relative">
        <Skeleton className="w-full rounded-lg">
          <div className="h-[220px] w-full bg-default-300 rounded-lg" />
        </Skeleton>
        <Skeleton className="absolute top-2 right-2 rounded-full">
          <div className="h-6 w-6 bg-default-300 rounded-full" />
        </Skeleton>
      </CardHeader>

      <Divider />

      {/* Card Content Skeleton */}
      <CardBody className="space-y-4">
        {/* Title Skeleton */}
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-4 w-3/5 bg-default-200 rounded-lg" />
        </Skeleton>

        {/* Address Skeleton */}
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 bg-default-200 rounded-lg" />
        </Skeleton>

        {/* Room Info Skeleton */}
        <div className="flex justify-between">
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-3 w-16 bg-default-300 rounded-lg" />
          </Skeleton>
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-3 w-16 bg-default-300 rounded-lg" />
          </Skeleton>
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-3 w-16 bg-default-300 rounded-lg" />
          </Skeleton>
        </div>

        {/* Price Skeleton */}
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-4 w-2/5 bg-default-200 rounded-lg" />
        </Skeleton>
      </CardBody>

      <Divider />

      {/* Learn More Skeleton */}
      <CardFooter className="flex justify-between items-center">
        <Skeleton className="w-1/3 h-5 rounded-lg">
          <div className="h-5 w-1/3 bg-default-300 rounded-lg" />
        </Skeleton>
        <Skeleton className="h-5 w-5 rounded-lg">
          <div className="h-5 w-5 bg-default-300 rounded-full" />
        </Skeleton>
      </CardFooter>
    </Card>
  );
}
