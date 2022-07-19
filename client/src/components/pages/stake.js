import React from "react";
import SEO from "../components/stake&oldToken/SEO";
import Layout from "../components/stake&oldToken/Layout";
import BreadcrumbOne from "../components/stake&oldToken/breadcrumb/BreadcrumbOne";
import SectionTitle from "../components/stake&oldToken/sectionTitle/SectionTitle";
import StakeBar from "../components/stake&oldToken/stakebar/searchbar1";
import { web3 } from "../../utils/web3";
import TrackVisibility from "react-on-screen";
import axios from "axios";
import Separator from "../components/stake&oldToken/separator/Separator";
import Skill from "../components/stake&oldToken/progressbar/Skill";
import ContractHorde from "../../contracts/ContractHorde";
import ContractStake from "../../contracts/ContractStake";
import { StyledHeader } from "../Styles";

const { REACT_APP_HOST_SERVER } = process.env;
class Stake extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tokens: [],
      progressData: [],
      Wallet: [],
      days: 86400,
      servertime: 0,
      reward: [],
      init05: 0,
    };
  }
  componentDidMount() {
    //<----------------------------
    let progress = this.setValance();
  }

  async stakingTok(code) {
    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    if (this.state.tokens[code] > 0) {
      let feed = String(this.state.tokens[code]);

      let approve = "";

      // let weiValue = web3.utils.toWei("128", "ether");
      approve = await ContractHorde.methods
        .approve(
          "0x841Fd97275A257D1d1d62143C8ddFdF084614c73",
          web3.utils.toWei(feed, "ether")
        )
        .send({ from: account });
      const stake = await ContractStake.methods
        .stake(web3.utils.toWei(feed, "ether"), code)
        .send({
          from: account,
          gas: "300000",
        });
      this.setValance();
    }
  }

  async wDrawTok(id) {
    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    //this.state.tokens
    const stake = await ContractStake.methods.withdraw(id).send({
      from: account,
      gas: "300000",
    });
    await this.setValance();
  }
  async getTime(i) {
    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    const time = await ContractStake.methods.getBalance(account).call();

    return time[1];
  }
  withDraw = async (id, code, amount, claim) => {
    // let valanc = await this.setValance().then
    const slot = this.state.Wallet[id].slot;
    //You don't have enough tokens available
    let rewarDays = this.daysByc(code);

    rewarDays = rewarDays * this.state.days;

    // let rewardate = Number(this.state.Wallet[id].signedD) + Number(rewarDays);

    let servertime = this.getTime().then((blocktime) =>
      this.setState(
        {
          servertime: blocktime,
        },
        async function validation() {
          if (this.state.servertime >= this.state.Wallet[id].rewardD) {
            if (code === "init30")
              alert(`Due to the bug we had with this 90 day contract we have to send the reward part in two 
            separate parts. You will receive the first part automatically when claiming the contract and 
            the second part you will receive in a few hours in your wallet since we must send it.`);

            this.wDrawTok(slot).then(async () => {
              if (code === "init30") {
                const accounts = await web3.eth.getAccounts();
                const account = accounts[0];
                const reward = Math.round(parseInt(claim) - parseInt(amount));

                await axios.post(
                  `https://${REACT_APP_HOST_SERVER}/account/${account}/missing/${reward}`
                );
              }
            });
          } else {
            //poup
            alert("Reward time is not completed");
          }
        }
      )
    );
  };

  rendername(code) {
    /*  switch (code) {
      case "init05":
        return "Unlocked";
      case "init1":
        return "30 Days";
      case "init3":
        return "90 Days";
      case "init6":
        return "180 Days";
      case "init12":
        return "365 Days";
    }*/
    if (code === "init5") {
      return "5 Days";
    }
    if (code === "init15") {
      return "15 Days";
    }
    if (code === "init30b") {
      return "30 Days";
    }
    if (code === "init30") {
      return "90 Days";
    }
    if (code === "init5c") {
      return "5 Days";
    }
    if (code === "init15c") {
      return "15 Days";
    }
    if (code === "init30c") {
      return "30 Days";
    }
  }
  daysByc(code) {
    /* switch (code) {
      case "init05":
        return 0;
      case "init1":
        return 30;
      case "init3":
        return 90;
      case "init6":
        return 180;
      case "init12":
        return 365;
    }*/
    if (code === "init5") {
      return 5;
    }
    if (code === "init15") {
      return 15;
    }
    if (code === "init30b") {
      return 30;
    }
    if (code === "init30") {
      return 90;
    }
    if (code === "init5c") {
      return 5;
    }
    if (code === "init15c") {
      return 15;
    }
    if (code === "init30c") {
      return 30;
    }
  }

  setValance = async () => {
    await this.valance();
  };
  async valance() {
    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    //const slot = await ContractStake.methods._userSlot(account).call();
    //const time = await ContractStake.methods.getBalance(account).call();

    const wally = await ContractStake.methods.getWallet(account).call();
    const blocktime = wally[1];
    console.log(wally[0]);
    const Wallet = JSON.parse(wally[0]);

    if (Wallet.length > 0) {
      this.setState({ Wallet: Wallet });
      const progressData = [];

      let title = "";

      const data = {};
      for (var i = 0; i < Wallet.length; i++) {
        const progressD = {};
        title = "";

        // if (Wallet.length > 0) {
        title = this.rendername(Wallet[i].code);

        let diftime = blocktime - Wallet[i].signed;

        let difday = diftime / this.state.days;

        let condays = this.daysByc(Wallet[i].code);

        if (condays > 0) {
          difday.toFixed(0);
          progressD.days = condays - difday.toFixed(0);
          progressD.percantage = (difday / condays) * 100;
        } else {
          // progressD.percantage = wallet.signedDate;
          progressD.percantage = 100;
          progressD.days = 0;
        }

        progressD.title = title;
        progressD.action = Wallet[i].code;
        progressD.progressColor = "#059DFF";
        progressD.id = i;
        progressD.slot = Wallet[i].slot;
        progressD.amount = web3.utils.fromWei(Wallet[i].cantidad, "ether");
        progressD.claim = this.otpReward(
          progressD.amount,
          Wallet[i].code,
          difday.toFixed(0)
        );
        progressData.push(progressD);
        //  }
      }

      this.setState({ progressData: progressData });
    }
  }

  vSearch = (term, code) => {
    let tokens = this.state.tokens;
    tokens[code] = term;
    this.setState({ tokens: tokens });

    this.prmisedreward(term, code);
  };
  addTokkens = (code) => {
    this.stakingTok(code);
  };
  otpReward(amount, code, difdays) {
    let days = this.daysByc(code);

    let rewards;

    rewards = amount;
    /* if (code == "init1") {
      rewards = Number(amount) + Number(days * 0.026 * amount) / 100;
    }
    if (code == "init3") {
      rewards = Number(amount) + Number(days * 0.032 * amount) / 100;
    }
    if (code == "init6") {
      rewards = Number(amount) + (Number(days * 0.054) * amount) / 100;
    }
    if (code == "init12") {
      rewards = Number(amount) + Number(days * 0.095 * amount) / 100;
    }

    if (code == "init05") {
      rewards = Number(amount) + Number(amount * difdays * 0.022) / 100;
    }*/
    if (code === "init5") {
      rewards = Number(amount) + Number(amount * difdays * 0.82) / 100;
    }
    if (code === "init15") {
      rewards = Number(amount) + Number(amount * difdays * 0.96) / 100;
    }
    if (code === "init30b") {
      rewards = Number(amount) + Number(amount * difdays * 1.1) / 100;
    }
    if (code === "init30") {
      rewards = Number(amount) + Number(amount * difdays * 1.1) / 100;
    }
    if (code === "init5c") {
      rewards = Number(amount) + Number(amount * difdays * 0.41) / 100;
    }
    if (code === "init15c") {
      rewards = Number(amount) + Number(amount * difdays * 0.48) / 100;
    }
    if (code === "init30c") {
      rewards = Number(amount) + Number(amount * difdays * 0.55) / 100;
    }

    return rewards;
  }

  prmisedreward(amount, code) {
    let days = this.daysByc(code);

    let rewards = 1;
    /*  if (code == "init1") {
      rewards = Number(amount) + Number(days * 0.026 * amount) / 100;
    }
    if (code == "init3") {
      rewards = Number(amount) + Number(days * 0.032 * amount) / 100;
    }
    if (code == "init6") {
      rewards = Number(amount) + (Number(days * 0.054) * amount) / 100;
    }
    if (code == "init12") {
      rewards = Number(amount) + Number(days * 0.095 * amount) / 100;
    }

    if (code == "init05") {
      rewards = Number(amount) + Number(amount * 0.022 * 30) / 100;
    }*/
    if (code === "init5") {
      rewards = Number(amount * 1 * 0.82) / 100;
    }
    if (code === "init15") {
      rewards = Number(amount * 1 * 0.96) / 100;
    }
    if (code === "init30b") {
      rewards = Number(amount * 1 * 1.1) / 100;
    }
    if (code === "init30") {
      rewards = Number(amount * 1 * 1.1) / 100;
    }
    if (code === "init5c") {
      rewards = Number(amount * 1 * 0.41) / 100;
    }
    if (code === "init15c") {
      rewards = Number(amount * 1 * 0.48) / 100;
    }
    if (code === "init30c") {
      rewards = Number(amount * 1 * 0.55) / 100;
    }
    let reward = this.state.reward;

    //  rew = rewards;

    reward[code] = rewards.toFixed(4);

    this.setState({ reward });
  }
  render() {
    return (
      <>
        <StyledHeader theme={"GREY"} />
        <SEO title="STAKE" />
        <Layout>
          <BreadcrumbOne
            title="Stake your HORDE <br />    get amazing rewards"
            rootUrl="/"
            parentUrl="Home"
            currentUrl="Stake"
          />

          <div className="main-content">
            <Separator />

            {/* Start Elements Area  */}
            <div className="rwt-pricing-area rn-section-gap">
              <div className="container">
                <div className="row mb--40 mb_sm--0">
                  <div className="col-lg-12">
                    <SectionTitle
                      textAlign="text-center"
                      radiusRounded=""
                      subtitle="Go for rewards"
                      title="STAKE"
                      description=""
                    />
                  </div>
                </div>
                <div className="row row--15">
                  {/* Start PRicing Table Area  */}
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="rn-pricing style-2 ">
                      <div className="pricing-table-inner">
                        <div className="pricing-header">
                          <h4 className="title">Lock 5 Days</h4>
                          <div className="pricing">
                            <div className="price-wrapper">
                              <span className="currency">%</span>
                              <span className="price">150</span>
                            </div>
                            <span className="subtitle">APY</span>
                          </div>
                        </div>
                        <div className="pricing-body">
                          <ul className="list-style--1">
                            <li>Amount</li>
                            <li>
                              <StakeBar
                                onSTChange={(term) =>
                                  this.vSearch(term, "init5c")
                                }
                              />
                            </li>

                            <li>
                              Reward per day: {this.state.reward["init5c"]}
                            </li>
                          </ul>
                        </div>
                        <div className="pricing-footer">
                          <button
                            className="btn-default"
                            href="stake"
                            onClick={() => this.addTokkens("init5c")}
                          >
                            Stake Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End PRicing Table Area  */}

                  {/* Start PRicing Table Area  */}
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="rn-pricing style-2">
                      <div className="pricing-table-inner">
                        <div className="pricing-header">
                          <h4 className="title">Lock 15 Days</h4>
                          <div className="pricing">
                            <div className="price-wrapper">
                              <span className="currency">%</span>
                              <span className="price">175</span>
                            </div>
                            <span className="subtitle">APY</span>
                          </div>
                        </div>
                        <div className="pricing-body">
                          <ul className="list-style--1">
                            <li>Amount</li>
                            <li>
                              <StakeBar
                                onSTChange={(term) =>
                                  this.vSearch(term, "init15c")
                                }
                              />
                            </li>
                            <li>
                              Reward per day: {this.state.reward["init15c"]}
                            </li>
                          </ul>
                        </div>
                        <div className="pricing-footer">
                          <button
                            className="btn-default"
                            onClick={() => this.addTokkens("init15c")}
                          >
                            Stake Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End PRicing Table Area  */}
                  {/* Start PRicing Table Area  */}
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="rn-pricing style-2">
                      <div className="pricing-table-inner">
                        <div className="pricing-header">
                          <h4 className="title">Lock 30 Days</h4>
                          <div className="pricing">
                            <div className="price-wrapper">
                              <span className="currency">%</span>
                              <span className="price">200</span>
                            </div>
                            <span className="subtitle">APY</span>
                          </div>
                        </div>
                        <div className="pricing-body">
                          <ul className="list-style--1">
                            <li>Amount</li>
                            <li>
                              <StakeBar
                                onSTChange={(term) =>
                                  this.vSearch(term, "init30c")
                                }
                              />
                            </li>
                            <li>
                              Reward per day: {this.state.reward["init30c"]}
                            </li>
                          </ul>
                        </div>
                        <div className="pricing-footer">
                          <button
                            className="btn-default"
                            href="#pricing"
                            onClick={() => this.addTokkens("init30c")}
                          >
                            Stake Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End PRicing Table Area  */}
                </div>
              </div>
            </div>
            {/* Start Elements Area  */}

            {/* End Elements Area  */}
            <Separator />

            {/* End Elements Area  */}
          </div>
          <div className="rwt-elements-area rn-section-gap">
            <div className="container"></div>
            <SectionTitle
              textAlign="text-center"
              radiusRounded=""
              subtitle="Go for rewards"
              title="WITHDRAW"
              description=""
            />

            <Separator />

            <div className="row row--30 mt--20">
              <div className="col-lg-10 offset-lg-1">
                <div className="rbt-progress-style-1 mt--10">
                  {this.state.progressData.map((progress) => (
                    <TrackVisibility
                      once
                      key={progress.id}
                      className="single-progress"
                    >
                      <Skill progress={progress} />
                      <br />
                      <a
                        className="btn-default"
                        href="#"
                        onClick={() =>
                          this.withDraw(
                            progress.id,
                            progress.action,
                            progress.amount,
                            progress.claim
                          )
                        }
                      >
                        Claim Now
                      </a>
                      <Separator />
                    </TrackVisibility>
                  ))}
                  <Separator />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}
export default Stake;
