
export default function Dashboard (){
    return(
        <div className ="bg-white rounded-2xl p-6 shadow-sm">
            <h1 className ="text-2xl text-justify text-gray-800 font-bold">Dashboard</h1>
            <p className ="text-sm text-gray-500">Welcome Back, 'name' | Unit: SMI | Cluster: Academic</p>

            <div className="grid grid-cols-4 p-6 gap-4">
                <div clasName="bg-gray-100 rounded-lg p-4 flex flex-col items-center text-center">CARD 1</div> 
                <div clasName="bg-gray-100 rounded-lg p-4 flex flex-col items-center text-center">CARD 2</div>   
                <div clasName="bg-gray-100 rounded-lg p-4 flex flex-col items-center text-center">CARD 3</div>
                <div clasName="bg-gray-100 rounded-lg p-4 flex flex-col items-center text-center">CARD 4</div>        
            </div>
        </div>

    )
}