"use client"
import { useEffect, useState } from "react"
import useGetWriters from "@/hooks/useGetWriters"
import SlidingBoxes from "../components/ImageBoxes"
import NavBar from "../components/NavBar"

interface Writers {
  user: number
  pp: string
  education: number
  rating: number
}

export default function WriterPage() {
  const [data, setData] = useState<Writers[] | null>(null)
  const { getWriters } = useGetWriters()

  useEffect(() => {
    const fetchData = async () => {
      const result = await getWriters()
      setData(result)
  console.log("**********************************************************************" )
  console.log(result);
  console.log("**********************************************************************" )
    }
    fetchData()
  }, [getWriters]) 
const image_box_data = data
  ? data.map(item => [item.pp, item.rating.toString()] as [string, string])
  : []
  return (
    <div className="w-full bg-blue">
    <NavBar />
      <SlidingBoxes image_list={{ values: image_box_data }} />
    </div>
)
}
