import { ProfileForm } from "~/components/profileForm";


export const action = async () => {
    console.log("triggered")
  };
export default function Authentication(){
    return(
        <div className="flex items-center flex-col justify-center w-screen sm:mt-20 lg:mt-48" >
            <h1 className="m-10 poppins-regular lg:text-2xl sm:text-xl" >Who Are You?</h1>
            <ProfileForm isLogin={true} />
        </div>
    )
}