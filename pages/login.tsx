import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../apollo/mutations';
import { LocalManager, UserType, Storage, initStorage } from 'utils/Storage';
import pageInfo from 'info/login.json'
import { Upload } from 'components/common/Upload';
import { getEditUtils } from 'utils/pageEdit';
import { AppContext } from './_app';
import { BG } from '../types/const';

interface IProp { 

}

export const Login: React.FC<IProp> = () => {
    const { editMode } = useContext(AppContext)
    const [saveId, setSaveId] = useState(false);
    const [saveSession, setSaveSession] = useState(false);
    const [userId, setId] = useState("");
    const [userPw, setPw] = useState("");
    const [userType, setUserType] = useState<UserType>(UserType.individual)
    const [page, setPage] = useState(pageInfo);
    const { edit, ulEdit, imgEdit } = getEditUtils(editMode, page, setPage);

    const sessionSave = () => {
        const answer = confirm('브라우저를 닫더라도 로그인이 계속 유지될 수 있습니다.\n\n로그인 유지 기능을 사용할 경우 다음 접속부터는 로그인할 필요가 없습니다.\n\n단, 게임방, 학교 등 공공장소에서 이용 시 개인정보가 유출될 수 있으니 꼭 로그아웃을 해주세요.')
        if (!answer) return;
        setSaveSession(true);
        // saveLocal("saveSession", "saved");
    }
    // 로그인성공시
    // saveLocal("saveid", id);
    useEffect(() => {
        initStorage()
        setId(Storage.getLocal("saveid", ""))
        setSaveId(!!Storage.getLocal("saveId?", ""))
        setSaveSession(!!Storage.getLocal("saveSession?", ""))
    }, [])


    useEffect(() => {

    }, [saveId, saveSession])

    const handleUserType = (type:UserType) => {
        setUserType(type);
        console.log(userType);
    }
       
    const handleId = (id:string) => {
        setId(id);
        console.log(userId);
    }

    const handlePw = (pw:string) => {
        setPw(pw);
        console.log(userPw);
    }

    const handleLoginChk = (loginState) => {
        if(loginState) {

        }else {
            alert('로그인에 시패하였습니다');
        }
    }
        
    const [LoginMu, { loading: create_loading }] = useMutation(SIGN_IN, {
        onCompleted: () => {
        console.log('result');
            handleLoginChk(true);
        }
    })

    const handleLogin = () => {

        console.log('login start'); 

        LoginMu({
            variables: {
              data: {
                email : userId,
                pw: userPw,
              }
            }
        })
            
    }



    return <div >
        <div className="top_visual">
            <div
                className="sub_header sub_bg"
                style={BG(page.top_bg)}
            >
                <div className="w1200">
                    <h2 className="title">로그인</h2>
                    <p className="text">지금 여행을 떠나세요~!~~!!!!!</p>
                </div>
                <Upload onUpload={imgEdit("top_bg")} />
            </div>
            <div className="header_nav">
                <ul>
                    <li className="home">
                        <a href="/main."></a>
                    </li>
                    <li className="homedeps1">Member</li>
                    <li className="homedeps2">
                        <a href="../login">로그인</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="login_box">
            <div className="sign_in w1200">
                <div className="inner">
                    <div className="login_page">
                        <input
                            id="tab-1"
                            type="radio"
                            name="radio-set"
                            className="tab-selector-1"
                            value="individual"
                            defaultChecked
                            onClick={()=>{handleUserType(UserType.individual)}}
                        />
                        <label htmlFor="tab-1" className="tab-label-1 login_tap tap_01 ">
                            <b>개인</b>
                        </label>
                        <input
                            id="tab-2"
                            type="radio"
                            name="radio-set"
                            className="tab-selector-2"
                            value="partnerB"
                            onClick={()=>{handleUserType(UserType.partnerB)}}
                        />
                        <label htmlFor="tab-2" className="tab-label-2 login_tap tap_02">
                            <b>기업파트너</b>
                        </label>
                        <input
                            id="tab-3"
                            type="radio"
                            name="radio-set"
                            className="tab-selector-3"
                            value="partner"
                            onClick={()=>{handleUserType(UserType.partner)}}
                        />
                        <label htmlFor="tab-3" className="tab-label-3 login_tap tap_03">
                            <b>개인파트너</b>
                        </label>
                        <input
                            id="tab-4"
                            type="radio"
                            name="radio-set"
                            className="tab-selector-4"
                            value="manager"
                            onClick={()=>{handleUserType(UserType.manager)}}
                        />
                        <label htmlFor="tab-4" className="tab-label-4 login_tap tap_03">
                            <b>매니저</b>
                        </label>
                        <Box index={1} handleId={handleId} handlePw={handlePw} handleLogin={handleLogin} />
                        <Box index={2} handleId={handleId} handlePw={handlePw} handleLogin={handleLogin} />
                        <Box index={3} handleId={handleId} handlePw={handlePw} handleLogin={handleLogin} />
                        <Box index={4} handleId={handleId} handlePw={handlePw} handleLogin={handleLogin} />
                    </div>
                </div>
            </div>
        </div>
    </div>
};


interface IBoxProp {
    index: number;
    handleId:(id:string) => void;
    handlePw:(pw:string) => void;
    handleLogin:() => void;
}

const Box: React.FC<IBoxProp> = ({ index, handleId, handlePw, handleLogin }) => {

    return <div className={`login_wrap white_box login_0${index}`} id={`login_0${index}`}>
        <h3>
            <strong>FAMILY</strong> LOGIN
        </h3>
        <div className="form-group">
            <input
                type="text"
                name="user_id"
                id="uid"
                required
                placeholder="아이디"
                className="txt_id"
                title="아이디"
                onChange={(e)=>{handleId(e.target.value)}}
            />
        </div>
        <div className="form-group">
            <input
                type="password"
                name="password"
                id="upw"
                required
                placeholder="비밀번호"
                title="비밀번호"
                className="form-txt_pw"
                onChange={(e)=>{handlePw(e.target.value)}}
            />
        </div>
        <div className="form-group">
            <label htmlFor="keepid_opt" className="checkbox-inline">
                <input
                    type="checkbox"
                    name="keep_signed"
                    id="keepid_opt"
                    defaultValue="Y"
                    onClick={() => {

                    }}
                />
            로그인 유지
        </label>
            <label htmlFor="keepid_opt2" className="checkbox-inline">
                <input type="checkbox" id="keepid_opt2" defaultValue="Y" />{" "}
            아이디 기억
        </label>
        </div>
        <button type="submit" className="sum" onClick={handleLogin}>
            <span >로그인</span>
        </button>
        <div className="sign_in_form">
            <span>
                <a href="../join">회원가입</a>
            </span>
            <span>
                <a href="../findmembers">ID/PW 찾기</a>
            </span>
        </div>
    </div>
};

export default Login
