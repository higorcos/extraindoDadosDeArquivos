export default function FloatingButton(){
    return(<>
    <div>
    <div className="fixed top-[5px] left-[5px] flex justify-center items-center flex-col z-[51] ">
        <a className="py-[20px] px-[20px] m-[5px] [box-shadow:rgba(149,_157,_165,_0.2)_0px_8px_24px] bg-[white] rounded-[15px]"
        href="/admin/novo">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"  fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
            </svg>
        </a>
        <a className="py-[20px] px-[20px] m-[5px] [box-shadow:rgba(149,_157,_165,_0.2)_0px_8px_24px] bg-[white] rounded-[15px]"
        href="/admin/listagem">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-collection-fill" viewBox="0 0 16 16">
            <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1"/>
            </svg>
        </a>
        <a className="py-[20px] px-[20px] m-[5px] [box-shadow:rgba(149,_157,_165,_0.2)_0px_8px_24px] bg-[white] rounded-[15px]"
        href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-buildings-fill" viewBox="0 0 16 16">
            <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zM2 11h1v1H2zm2 0h1v1H4zm-1 2v1H2v-1zm1 0h1v1H4zm9-10v1h-1V3zM8 5h1v1H8zm1 2v1H8V7zM8 9h1v1H8zm2 0h1v1h-1zm-1 2v1H8v-1zm1 0h1v1h-1zm3-2v1h-1V9zm-1 2h1v1h-1zm-2-4h1v1h-1zm3 0v1h-1V7zm-2-2v1h-1V5zm1 0h1v1h-1z"/>
            </svg>
        </a>

      
    </div>
    </div>
    </>)
}