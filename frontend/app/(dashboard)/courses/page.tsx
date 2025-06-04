import Image from "next/image"
import Link from "next/link"

export default function Courses(){
   return(
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
         <Image src="/images/no-course.png" alt="sleeping bear" width={340} height={255}/>
         <h1 className="text-2xl mb-1">No course available</h1>
         <p className="text-sm mb-5">Courses will appear here after they have been added.</p>
         <Link href="/add-course" className="bg-[#212121] text-white text-sm font-semibold px-4 py-2 rounded-sm">Add Course</Link>
      </div>
   )
}