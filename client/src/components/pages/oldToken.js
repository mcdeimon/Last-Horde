import { web3, active } from "../../utils/web3";
import contrato from "../../contracts/contratoOLD1";
import contratoExc from "../../contracts/contratoOLDexc";
import contratoToken from "../../contracts/contratoOLDToken";
import React, { Component } from "react";
import WithdrawBar from "../components/stake&oldToken/searchbar1";
import Layout from "../components/stake&oldToken/Layout";
import { StyledHeader } from "../Styles";
//import background from "%PUBLIC_URL%/background.png";
class OldToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: "",
      tokens: "0",
      totalAmount: "0",
      reward: "0",
      reminder: "0",
      elockreminder: "0",
    };
  }
  setValance = () => {
    const total = this.valance().then((total1) =>
      this.setState({
        totalAmount: total1.total,
        reward: total1.reward,
        reminder: total1.reminder,
        elock: total1.elock,
      })
    );
  };
  async valance() {
    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    const manager = await contratoExc.methods.getStackingAmount(account).call();
    return {
      total: manager[0],
      reward: manager[2],
      reminder: manager[1],
      elock: manager[3],
    };
  }
  async stakingTok() {
    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    console.log(account);
    if (this.state.tokens > 0) {
      //this.state.tokens
      let feed = String(this.state.tokens);
      let approve = "";

      // let weiValue = web3.utils.toWei("128", "ether");
      approve = await contratoToken.methods
        .approve(
          "0x59b8b574b74a2c6bd48bb885c430b846c66a1182",
          web3.utils.toWei(feed, "ether")
        )
        .send({ from: account });
      console.log(feed);
      console.log(web3.utils.toWei(feed, "ether"));
      const stake = await contrato.methods
        .stake(web3.utils.toWei(feed, "ether"))
        .send({
          from: account,
          gas: "300000",
        });
    }
  }
  async wDrawTok() {
    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    let feed = String(this.state.tokens2);
    if (this.state.tokens2 > 0) {
      //this.state.tokens
      const stake = await contratoExc.methods
        .withdraw(web3.utils.toWei(feed, "ether"))
        .send({
          from: account,
          gas: "300000",
        });
    }
  }
  vSearch = (term) => {
    this.setState({ tokens: term });
  };
  vDraw = (draw) => {
    this.setState({ tokens2: draw });
  };
  addTokkens = () => {
    this.setValance();
    this.stakingTok();
  };
  withDraw = () => {
    // let valanc = await this.setValance().then
    const total = this.valance().then((total1) =>
      this.setState(
        {
          totalAmount: total1.total,
          reward: total1.reward,
          reminder: total1.reminder,
          elock: total1.elock,
        },
        function valdidation() {
          if (this.state.elock == true) {
            //You don't have enough tokens available
            if (this.state.tokens2 <= parseInt(this.state.reward) / 1e18) {
              this.wDrawTok();
            } else {
              //poup
              alert("You don't have enough tokens available");
            }
          } else {
            alert("The withdrawal period has not started yet");
          }
        }
      )
    );
  };

  render() {
    if (active === 0) {
      return (
        <div className="OldToken">
          <h3>Please install a wallet</h3>
        </div>
      );
    } else {
      return (
        <>
          <StyledHeader theme={"GREY"} />
          <Layout>
            <div className="OldToken">
              <div className="App">
                <div className="sidebar">
                  <div className=" available">
                    Available: {web3.utils.fromWei(this.state.reward, "ether")}{" "}
                    HOR
                  </div>
                  <div className="Balance">
                    Balance: {web3.utils.fromWei(this.state.reminder, "ether")}{" "}
                    HOR
                  </div>
                </div>
                <div className="div-row-oldt">
                  <button
                    id="balance"
                    onClick={this.setValance}
                    className="oldt-buttons"
                  >
                    Balance
                  </button>
                  {"  "}
                  {"  "}

                  {"  "}
                  {"  "}
                  <button
                    id="withdraw"
                    onClick={this.withDraw}
                    className="oldt-buttons"
                  >
                    Withdraw Tokens
                  </button>
                  <WithdrawBar onSTChange={(draw) => this.vDraw(draw)} />
                </div>
              </div>
            </div>
          </Layout>
        </>
      );
    }
  }
}
export default OldToken;
