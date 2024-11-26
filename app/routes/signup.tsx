import { ProfileForm } from "~/components/profileForm";

export default function Signup(){
    return(
        <div className="flex w-screen flex-col items-center justify-center mt-52">
            <h1 className="m-10 poppins-regular lg:text-2xl sm:text-xl" >Tell about yourself?</h1>
            <ProfileForm isLogin={false} />
        </div>
    )
}