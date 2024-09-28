import { AppBar, Toolbar, Box } from '@mui/material';


const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#e7b8ef'}}>
        <Toolbar >
            <Box sx={{ flexGrow: 1 }}></Box> {/* เว้นพื้นที่ด้านซ้าย */}
            <img 
                src="https://pedrr.org/wp-content/uploads/2021/04/sdg_logo.png" // เปลี่ยนเป็น path ของรูปภาพที่ถูกต้อง
                alt="Logo"
                style={{ width: '150px' }} // กำหนดขนาดโลโก้ตามต้องการ
            />
            <Box sx={{ flexGrow: 1 }}></Box> {/* เว้นพื้นที่ด้านขวา */}
        </Toolbar>
    </AppBar>
    )
}

export default Navbar