import { redirect } from "next/navigation";

const SetupPage = () =>{
  const isLogin = true;
  if(isLogin){
    return redirect(`/servers/1`)
  }
  return (
    <div>
      Hello World Page!
    </div>
  )
}
export default SetupPage