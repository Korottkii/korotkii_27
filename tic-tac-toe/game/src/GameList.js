import React from 'react';
import ReactDom from 'react-dom';
import {Add_Game} from './Add_Game.css';
import {AddGame} from './AddGame.js';
import SaveGame from './SaveGame.js';
import { Redirect } from 'react-router-dom';



export class Game_List extends React.Component {
    constructor(props){
        super(props);
        // SaveGame.init();
        const id = this.props.match.params.id;
            let games = SaveGame.get_game("games");
            let game = games.find(game =>game.id == id)
        
        this.state = {
            redirect: false,
            path: "",     
            games:games, 
            game:game,      
        }
    }

//     componentDidMount(){
       
        
//         setInterval(()=>{  
           
//             let id = this.props.match.params.id;
//             let games = SaveGame.get_game("games");
//             let game = games.find(game =>game.id == id);               
           
//             game.cells = this.state.cells;                  
           
//             this.setState({game:game});             
            
//             SaveGame.save("games", games);
       

//         },5000);
    
// }

   
    render(){
        if (this.state.redirect) {
            return (
               <Redirect to = {this.state.path} />
            );
        }        

        function handleKeyDown(event) {
            // if( this.name.value == "" ){
            //     alert ("Необходимо введите своё имя");               
            //     this.setState({
            //         redirect: false,
                    
            //     });
            // }
            // else{

            
            //     if (event.keyCode == 13) {    // Нажат Enter
            
            //         let game = SaveGame.get_game("games");
            //         let length = game.length;                   
            //         let newgame = {
            //             id: length + 1 ,
            //             player_1: this.name.value,    
            //             player_2: "",      
            //             winner:"",
            //             cells:"",
            //         };
                    
            //         game.push(newgame);
            //         SaveGame.save("games", game);
                    
            //         this.setState({
            //             // path: "/AddGame/" + newgame.player_1,
            //             path: "/AddGame/" + newgame.id,
            //             redirect: true,
                        
            //         });      
            //     }
            // }    
        }
        
        function game_start(){
           
            if( this.name.value == "" ){
                alert ("Необходимо ввести своё имя");               
                this.setState({
                    redirect: false,
                    
                });
            }

            else{
                let game = SaveGame.get_game("games");
                let length = game.length;                   
                let newgame = {
                    id: length + 1 ,
                    player_1: this.name.value,    
                    player_2: "",      
                    winner: "",
                    cells: "",
                };
                console.dir(newgame);
                game.push(newgame);
                SaveGame.save("games", game);
                this.setState({
                    path: "/AddGame/" + newgame.id,
                    redirect: true,
                    
                });
            }            
        }        

        function join_player_2(id){
            if(this.state.game.player_1 !=="" && this.state.game.player_2 !==""){   // этим условием я хочу проверить что игрок 1 и 2 имеют имя, и по этому надо перекинуть на их игру для просмотра игры
                this.setState({
                    path:"/AddGame/" + id,
                    redirect:true,
                    
                })
                alert("fss");
            }

            if(this.name.value == ""){
                    alert("Необходимо ввести своё имя");
                   
            }

            else{
                
                let games = SaveGame.get_game("games");
                let game = games.find(game =>game.id == id)
                let newgame = {
                    id:id,
                    player_1: game.player_1,
                    player_2: this.name.value,
                    winner:"",
                    cells:"",
                }
                
                let currentIndex = games.findIndex(game => game.id == this.id);
                games.splice(currentIndex,1)
                
                games.push(newgame);
                SaveGame.save("games", games);

                this.setState({
                    path:"/AddGame/" + newgame.id,
                    redirect: true,
                });
            }
            
        }
        let game = SaveGame.get_game("games");

        return( 
            <div className="disp">               
                <div className="title_game" >
                    <h4 className="title_text">Tic tac toe </h4>
                </div>

                <input onKeyDown={handleKeyDown} className="pole_name"  placeholder="Введите своё имя" ref={el=>this.name=el}></input>
                                
                <div className="select_game">
                    <br/>
                    {this.state.games.map(game=>(                       
                        <div key = {game.id} className="game" onClick={join_player_2.bind(this,game.id)}> 
                           
                            <div className="first">
                                {game.player_1} <br/>
                                {game.id}<br/>
                                {game.winner}
                            </div>

                            <div className="second">
                                {game.player_2} <br/>
                                {game.id}<br/>
                                {game.winner}
                            </div>
                        </div>     
                    ))}
                    
                    <div  className="Add_player">          
                       <button  className="Add" onClick={game_start.bind(this,game.id)}>  </button>
                    </div>
                   
                </div>

                
            </div>
        );
    }


}
