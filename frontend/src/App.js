import React, { Component } from "react";

import Modal from "./components/Modal";
//import axios from "axios";

// リクエスト送信用のaxiosとモーダルをimport
class App extends Component {

    // Stateの設計からやり直す。
    constructor(props) {
        super(props);
        this.state = {
            topicList: [],
            modal: false,
            activeItem: {
                comment: "",
            },
        };
    }
    componentDidMount() {
        this.refreshList();
    }

    refreshList     = () => {

        const url       = "/api/topics/";
        const method    = "GET";
        const headers   = { "Content-Type": "application/json" };

        fetch(url, { method, headers })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then( (data) => {
            this.setState({ topicList: data })
        })
        .catch( (error) => {
            console.log(error);
        });

    };

    handleSubmit    = (item) => {
        const url       = item.id ? `/api/topics/${item.id}/` : "/api/topics/";
        const method    = item.id ? "PUT" : "POST";
        const headers   = { "Content-Type": "application/json" };
        const body      = JSON.stringify(item);

        fetch(url, { method, headers, body })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then( (data) => {
            this.refreshList();
        })
        .catch( (error) => {
            console.log(error);
        });

        this.closeModal();
    };

    handleDelete    = (item) => {

        const url       = `/api/topics/${item.id}/`;
        const method    = "DELETE";
        const headers   = { "Content-Type": "application/json", };

        fetch(url, { method, headers })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }

            // レスポンスのボディは空なので、.then( data => {} ) につなげる必要はない。
            this.refreshList();
        })
        .catch( (error) => {
            console.log(error);
        });

    };


    openModal       = (item) => {
        // 編集時はコメントをセット
        if (item.id){
            this.setState({ activeItem: item, modal: true });
        }
        else{
            this.setState({ activeItem: { comment:"" }, modal: true });
        }
    };
    closeModal      = () => {
        this.setState({ activeItem: { comment:"" }, modal: false });
    };


    // 改行をする
    linebreaksbr    = (string) => {

        // React.Fragment は <></> と同じであるが、今回はkeyを指定する必要があるため、React.Fragmentとする 
        return string.split('\n').map((item, index) => (
            <React.Fragment key={index}>
                {item}
                {index !== string.split('\n').length - 1 && <br />}
            </React.Fragment>
        )); 
    };

    renderItems     = () => {
        return this.state.topicList.map((item) => (
            <div className="border" key={ item.id }>
                <div>{ item.id }</div>
                <div>{ this.linebreaksbr(item.comment) }</div>
                <div className="text-end">
                    <input type="button" className="mx-1 btn btn-success" value="編集" onClick={ () => this.openModal(item) } />
                    <input type="button" className="mx-1 btn btn-danger" value="削除" onClick={ () => this.handleDelete(item) } />
                </div>
            </div>
        ));
    };
    render() {
        return (
            <>
                <h1 className="bg-primary text-white text-center">簡易掲示板</h1>
                <main className="container">

                    <input className="btn btn-primary" type="button" onClick={ () => this.openModal(this.state.activeItem) } value="新規作成" />
                    { this.state.modal ? ( <Modal activeItem    = { this.state.activeItem }
                                                  handleSubmit  = { this.handleSubmit }
                                                  closeModal    = { this.closeModal } /> ): null }
                    { this.renderItems() }

                </main>
            </>
        );
    };
}

export default App;

