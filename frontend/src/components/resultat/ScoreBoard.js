/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react'

export class ScoreBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Players: [
        {
          imgSrc: 'test.png',
          name: 'islem',
          score: '10 / 100',
        },
        {
          imgSrc: 'test.png',
          name: 'ghilas',
          score: '80 / 100',
        },
        {
          imgSrc: 'test.png',
          name: 'idriss',
          score: '90 / 100',
        },
        {
          imgSrc: 'test.png',
          name: 'moha',
          score: '70 / 100',
        },
        {
          imgSrc: 'test.png',
          name: 'moha2',
          score: '60 / 100',
        },
        {
          imgSrc: 'test.png',
          name: 'ANTOINE',
          score: '100 / 100',
        },
      ],
    }
  }

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body" />
          <table className="table table-borderless">
            <col style={{ width: '10%' }} />
            <col style={{ width: '80%' }} />
            <col style={{ width: '10%' }} />
            <tbody>
              {
                // eslint-disable-next-line react/destructuring-assignment
                this.state.Players.map((el, index) => (
                  <tr>
                    <td className="border-0"><b className={index + 1 === 1 || index + 1 === 2 || index + 1 === 3 ? 'text-danger' : ' '}>{index + 1 === 1 ? '1st' : index + 1 === 2 ? '2nd' : index + 1 === 3 ? '3rd' : index + 1}</b></td>
                    <td className="border-0">
                      <div className="d-flex">
                        <img src={el.imgSrc} style={{ width: '50px', height: '50px' }} alt="image" />
                        <div className="align-self-center pl-3" />
                        <span className="font-weight-bold">{el.name}</span>
                      </div>
                    </td>
                    <td className="border-0">{el.score}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default ScoreBoard
