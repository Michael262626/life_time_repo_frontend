"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { createAccount, resetAccountState } from "@/store/accountSlice"
import { X, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { OccupationEnum } from "@/enums/OccupationEnum"

export default function AccountHolderModal() {
  const router = useRouter()
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const { loading, error, success } = useAppSelector((state) => state.account)

  const [image, setImage] = useState<File | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [occupation, setOccupation] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    if (!firstName || !lastName || !occupation || !image) return

    const formData = new FormData()
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("occupation", occupation)
    formData.append("image", image)

    await dispatch(createAccount(formData))
  }

  useEffect(() => {
    if (success) {
      toast({
        title: "Account Created",
        description: "The account holder has been successfully added.",
      })
  
      const timeout = setTimeout(() => {
        dispatch(resetAccountState())
        router.push("/")
      }, 1500)
  
      return () => clearTimeout(timeout)
    }
  }, [success, dispatch, router, toast])

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, toast])
  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">

        <button
          className="absolute right-4 top-4"
          onClick={() => router.push("/")}
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <h2 className="text-xl font-bold mb-1">Add an account holder</h2>
        <p className="text-gray-600 mb-6">Fill the details below in order to add an account holder.</p>

        {/* Image upload area */}
        <div className="mb-6">
          <div
            className={`relative rounded-full w-32 h-32 mx-auto border-2 border-dashed ${dragActive ? "border-green-500 bg-green-50" : "border-green-300"} flex items-center justify-center bg-green-50/50`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="absolute flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 bg-white rounded-md border border-gray-200 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM5 19V5H19V19H5ZM9.5 13.5L11 15.5L14 11.5L18 17H6L9.5 13.5Z"
                      fill="#C5C5C5"
                    />
                  </svg>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5">
                  <Upload className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-3">
            <label htmlFor="file-upload" className="text-green-500 font-medium cursor-pointer">
              Choose an image
            </label>
            <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleChange} />
            <p className="text-gray-500 text-sm mt-1">or drag and drop the image here</p>
          </div>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <Input
              id="firstName"
              placeholder="Enter first name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <Input
              id="lastName"
              placeholder="Enter last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
              Occupation
            </label>
            <Select onValueChange={setOccupation}>
              <SelectTrigger className="w-full text-gray-700">
                <SelectValue placeholder="Select occupation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={OccupationEnum.SOFTWARE_ENGINEER}>Software Engineer</SelectItem>
                <SelectItem value={OccupationEnum.DOCTOR}>Doctor</SelectItem>
                <SelectItem value={OccupationEnum.ARTIST}>Artist</SelectItem>
                <SelectItem value={OccupationEnum.LAWYER}>Lawyer</SelectItem>
                <SelectItem value={OccupationEnum.SCIENTIST}>Scientist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-10">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-md transition-colors"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
