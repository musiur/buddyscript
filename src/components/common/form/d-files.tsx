"use client"

import { cn } from "@/lib/utils"
import { MessageCircleWarning, Upload, X } from "lucide-react"
import Image from "next/image"
import { ReactElement, useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"

// accept={{
//   "image/*": [".png", ".jpg", ".jpeg", ".gif"],
//   "video/*": [".mp4", ".webm"],
//   "application/pdf": [".pdf"],
// }}

export type FileWithPreview = {
  file: File
  preview: string
}

const DFiles = ({
  name = "files",
  label = "Files",
  description,
  accept = {
    "*": [".*"],
  },
  maxSize = 5242880, // 5MB
}: {
  name: string
  label: string
  description?: string
  accept?: Record<string, string[]>
  maxSize?: number
}) => {
  const form = useFormContext()
  const [files, setFiles] = useState<FileWithPreview[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map(file => ({
        file,
        preview: ["image/", "video/"].some(type => file.type.startsWith(type))
          ? URL.createObjectURL(file)
          : "",
      }))

      setFiles(prev => [...prev, ...newFiles])
      const currentValues = form.getValues(name) || []
      form.setValue(name, [...currentValues, ...acceptedFiles])
    },
    [form, name]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
  })

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    const currentValues = form.getValues(name) || []
    form.setValue(
      name,
      currentValues.filter((_: File | string, i: number) => i !== index)
    )
  }

  const renderPreview = (file: FileWithPreview) => {
    // First render the preview/thumbnail
    let preview: ReactElement
    if (file.file.type.startsWith("image/")) {
      preview = (
        <Image
          src={file.preview}
          alt={file.file.name}
          className="w-full h-24 object-cover rounded-t-md"
          width={100}
          height={100}
        />
      )
    } else if (file.file.type.startsWith("video/")) {
      preview = (
        <video src={file.preview} className="w-full h-24 object-cover rounded-t-md" controls />
      )
    } else {
      preview = (
        <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded-t-md flex items-center justify-center">
          <div className="text-4xl">{file.file.type.includes("pdf") ? "📄" : "📎"}</div>
        </div>
      )
    }

    // Return combined preview and details card
    return (
      <div className="overflow-hidden rounded-xl border dark:border-gray-800">
        {preview}
        <div className="bg-white dark:bg-gray-900 p-2">
          <p className="font-medium text-sm truncate">{file.file.name}</p>
          <p className="text-xs text-gray-500">{(file.file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      </div>
    )
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="grid grid-cols-1 gap-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="grid gap-4">
              <div
                {...getRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-lg p-4 hover:border-primary cursor-pointer",
                  isDragActive && "border-primary bg-primary/10"
                )}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2 text-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Drag & drop files here, or click to select files
                  </p>
                  <p className="text-xs text-gray-500">
                    Max file size: {(maxSize / 1024 / 1024).toFixed(0)}MB
                  </p>
                </div>
              </div>

              {files?.length > 0 && (
                <ScrollArea className="h-[300px] w-full rounded-xl border p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {files.map((file, index) => (
                      <div key={index} className="relative group">
                        {renderPreview(file)}
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity z-[1]"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </FormControl>
          {description ? (
            <FormDescription className="flex flex-wrap items-center gap-2">
              <MessageCircleWarning className="w-4 h-4" />
              <span>{description}</span>
            </FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DFiles
