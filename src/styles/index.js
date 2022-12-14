export const ModalStyles = {
  modalMain:
    "flex flex-col justify-center items-center fixed z-50 left-1/2 top-1/4",
  modalBack:
    "bg-gray-200 dark:bg-gray-700 rounded-md drop-shadow-md dark:shadow-gray-500 dark:shadow max-w-[250px] z-50 m-auto p-2 fixed top-1/4",
  modalMainChild:
    "flex flex-col py-2 px-1 items-center justify-center text-gray-800 dark:text-gray-300",
  modalChild2: "flex flex-row items-center justify-between w-full mb-2",
  modalUltraBack: "fixed top-0 left-0 w-full h-full z-10 bg-black opacity-60",
  modalLabel: "text-gray-800 dark:text-gray-300 mb-2",
  modalField:
    "bg-gray-200 dark:bg-gray-600 outline-none border-gray-600 dark:border-gray-300 rounded border-2 p-2 mb-2",
  modalButton:
    "rounded block box-border text-gray-300 bg-green-600 dark:bg-gray-900 dark:hover:bg-green-600 p-2 text-sm",
};

export const DashStyle = {
  DashMain:
    "h-screen w-screen fixed flex flex-col items-center justify-start bg-gray-200 dark:bg-gray-900",
};

export const NotFoundStyles = {
  nfMain:
    "flex flex-row items-start justify-center p-4 bg-gray-300 min-h-screen",
  nf2: "flex flex-col w-full justify-start items-center",
  nf3: "flex flex-row items-center justify-start w-full",
  nfLink:
    "group text-gray-900 hover:text-gray-300 w-auto rounded-md p-2 no-underline font-medium bg-gray-300 hover:bg-gray-900",
  nfLink2: "flex flex-row justify-between items-center",
  nfLinkHover: "group-hover:text-gray-300 mx-3",
  nfImage:
    "flex flex-col w-1/4 h-1/4 box-border rounded-md drop-shadow-md mt-16",
};

export const MainLayoutStyles = {
  mlMain:
    "flex flex-col justify-center items-center w-[100vw] box-border my-auto",
  mlProps:
    "flex flex-col w-[97vw] xl:w-full scrollbar-hide overflow-x-scroll min-h-[90vh]",
};

export const BoardStyles = {
  board: "h-screen flex overflow-x-auto",
  bChild: "flex flex-row overflow-x-scroll",
  addList: "w-[272px] m-2 flex-shrink-0",
  listButton:
    "bg-gray-600 dark:bg-gray-700 rounded-md cursor-pointer text-gray-300 flex w-[170px] items-center justify-between min-h-[32px] py-1 px-2 h-fit transition hover:bg-gray-800",
};

export const EditButtonsStyles = {
  EditButtonGreen:
    "cursor-pointer w-fit ml-2 mr-1.5 mb-3 py-1 px-3 bg-gray-700 dark:bg-gray-900 rounded-md text-gray-100 font-normal outline-none hover:shadow-md hover:opacity-70",
  EditClose:
    "flex items-center text-xl opacity-50 hover:opacity-100 outline-none cursor-pointer mb-2",
};

export const ColumnEditorStyles = {
  ceText:
    "rounded bg-gray-200 w-full text-gray-900 dark:text-gray-200 dark:bg-gray-500 border-none resize-none outline-none text-base p-2 m-2 focus:shadow-md",
  ceIcon:
    "cursor-pointer text-2xl rounded-md text-gray-900 hover:bg-gray-300 p-1 my-0.5 mx-1",
};

export const ColumnStyles = {
  column:
    "bg-gray-400 dark:bg-gray-800 flex-shrink-0 w-[260px] h-fit scrollbar-hide min-h-[90vh] flex flex-col item-center justify-center max-h-[90vh] m-2 rounded-md shadow-md text-gray-900 dark:text-gray-200",
  cTitle:
    "w-[260px] flex flex-row w-fit items-center justify-between p-3 text-gray-200 rounded-md bg-gray-500 dark:bg-gray-700 mb-auto break-words z-10",
  cTitleChild: "flex flex-row items-center w-[16%] justify-between",
  cScrollable: "flex overflow-y-scroll scrollbar-hide flex-col h-[85vh]",
  cAddCard:
    "cursor-pointer py-3 px-2 text-gray-200 rounded-md flex items-center",
};

export const TaskEditorStyles = {
  teMain: "min-h-[50px] py-2 bg-gray-400 dark:bg-gray-800",
  teBase: "flex flex-col items-start m-2",
  textArea:
    "px-2 py-3 w-full border-none rounded-md resize-none outline-none text-sm bg-gray-300 dark:bg-gray-500 text-gray-800 dark:text-gray-200",
};

export const TaskStyles = {
  task: "relative flex flex-row items-center justify-between cursor-pointer backdrop-blur-sm bg-white/30 dark:bg-gray-500/20 m-2 p-3 bg-gray-300 dark:bg-gray-700 rounded-md shadow-md text-sm break-words min-h-[18px] hover:bg-gray-300 dark:hover:bg-gray-600",
  taskIcons: "absolute top-2 right-2 flex flex-row justify-end",
  taskIc:
    "cursor-pointer w-[24px] h-[24px] flex items-center justify-center rounded-md m-0 p-0 text-gray-900 bg-gray-300 hover:shadow-md ",
};

export const AssigneeModalStyles = {
  amMain:
    "flex flex-col justify-center items-center fixed z-50 left-1/2 top-1/4  cursor-default",
  amModal:
    "bg-gray-200 dark:bg-gray-700 w-[270px] rounded-md drop-shadow-md dark:shadow-gray-500 dark:shadow max-w-[250px] z-50 m-auto p-2 fixed top-1/4",
  amTitle:
    "flex flex-row items-center justify-between w-full p-2 bg-gray-300 dark:bg-gray-800 rounded-md",
  amTitleText: "font-semibold text-lg text-gray-800 dark:text-gray-300",
  amIconMain:
    "flex flex-col py-2 px-1 items-center justify-center text-gray-800 dark:text-gray-300",
  amIcon:
    "flex flex-row p-2 items-center w-full justify-between cursor-pointer rounded-md hover:bg-gray-400 dark:hover:bg-gray-800 hover:shadow-md",
  amBack: "fixed top-0 left-0 w-full h-full z-10 bg-black opacity-60",
};

export const HeaderStyles = {
  hMain:
    "flex z-50 flex-row items-center relative drop-shadow-md justify-between w-screen h-10 bg-gray-600 dark:bg-gray-800",
  hRocket: "text-gray-100 ml-4 cursor-pointer",
  hSub: "flex flex-row items-center justify-end",
  switchLabel: "mr-4 text-gray-300 font-montserrat",
};
