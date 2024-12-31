import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
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
import { CircleX } from "lucide-react";
import { Updatefilename } from '@/lib/actions/file.actions';
import { handleError } from '@/lib/utils';

const Rename = ({ trigger, onclosefunc, file }) => {
  const [filename, setFilename] = useState("");

  const handleSave = async () => {
    if (filename.trim() === "") {
      toast.error("Filename cannot be empty");
      return;
    }

    try {
      const updatedFile = {
        ...file,
        filename: filename.trim(),
      };

      const success = await Updatefilename(file.filereferenceid, updatedFile);

      if (success) {
        toast.success("Filename updated successfully");
        onclosefunc(); // Close dialog on success
      } else {
        toast.error("Failed to update filename. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the filename.");
    }
  };

  return (
    <AlertDialog open={trigger} onOpenChange={onclosefunc}>
      <AlertDialogContent className="w-[300px] h-[220px]">
        <AlertDialogHeader>
          <AlertDialogCancel className="border-none hover:bg-white absolute right-0 top-0 shadow-none active:bg-none">
            <CircleX color="#FFFFFF" fill="#A3B2C7" />
          </AlertDialogCancel>
          <AlertDialogTitle className="mx-auto text-xl font-semibold pb-1">Rename</AlertDialogTitle>
          <AlertDialogDescription className="text-medium">
            <Input
              type="text"
              placeholder="Enter your file name"
              className="rounded-3xl shadow-lg"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mx-auto mt-5 gap-4">
          <AlertDialogAction
            onClick={handleSave}
            className="rounded-3xl w-[200px] h-[40px] hover:shadow-none bg-red shadow-red/60 shadow-md"
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Rename;
