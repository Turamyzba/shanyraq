"use client";
import { Card, CardHeader, CardBody, CardFooter, Skeleton, Divider } from "@heroui/react";

export default function CardSkeleton() {
  return (
    <Card className="min-h-[345px] min-w-[267px] rounded-[10px] p-[16px] gap-[26px] bg-white flex flex-col justify-between items-start shadow-md">
      {/* Image section with share button skeleton */}
      <CardHeader className="relative">
        <Skeleton className="w-full rounded-[10px]">
          <div className="h-[130px] w-full bg-default-300 rounded-[10px]" />
        </Skeleton>
        <Skeleton className="absolute top-2 right-2 rounded-full">
          <div className="h-6 w-6 bg-default-300 rounded-full" />
        </Skeleton>
      </CardHeader>

      <Divider />

      {/* Text & details section */}
      <CardBody className="flex flex-col gap-[16px] justify-start w-full">
        {/* Title skeleton */}
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-4 w-3/5 bg-default-200 rounded-lg" />
        </Skeleton>
        {/* Address skeleton */}
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 bg-default-200 rounded-lg" />
        </Skeleton>
        {/* Row for calendar, room, gender, roommates skeletons */}
        <div className="flex items-center justify-between w-full">
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-3 w-full bg-default-300 rounded-lg" />
          </Skeleton>
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-3 w-full bg-default-300 rounded-lg" />
          </Skeleton>
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-3 w-full bg-default-300 rounded-lg" />
          </Skeleton>
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-3 w-full bg-default-300 rounded-lg" />
          </Skeleton>
        </div>
        {/* Price skeleton */}
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-4 w-2/5 bg-default-200 rounded-lg" />
        </Skeleton>
      </CardBody>

      <Divider />

      {/* Learn more section skeleton */}
      <CardFooter className="flex items-center justify-between w-full">
        <Skeleton className="w-1/3 h-5 rounded-lg">
          <div className="h-5 w-full bg-default-300 rounded-lg" />
        </Skeleton>
        <Skeleton className="h-5 w-5 rounded-lg">
          <div className="h-5 w-5 bg-default-300 rounded-full" />
        </Skeleton>
      </CardFooter>
    </Card>
  );
}
