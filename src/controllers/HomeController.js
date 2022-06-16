import Aluno from '../models/Aluno';


class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Maria',
      sobrenome: 'Miranda',
      email: 'maria@gmail.com',
      idade: 50,
      peso: 300,
      altura: 1.73,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
