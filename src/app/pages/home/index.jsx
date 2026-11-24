
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

export default function Home() {
  const [herois, setHerois] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregaHeroes = async () => {
    try {
      setCarregando(true);
      setErro(null);

      const response = await fetch(
        'https://superheroes-api-one.vercel.app/api/herois'
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar heróis');
      }

      const data = await response.json();
      const lista = Array.isArray(data) ? data : data?.herois || [];

      setHerois(lista);
    } catch (e) {
      setErro(e.message || 'Erro inesperado');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregaHeroes();
  }, []);

  const renderItem = ({ item }) => {
    const ehSuperman = item.nome?.toLowerCase().includes('superman');

    return (
      <View style={styles.card}>
        {item.foto && (
          <Image
            source={{
              uri: ehSuperman
                ? 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3'
                : item.foto
            }}
            style={styles.imagem}
            resizeMode="cover"
          />
        )}

        <View style={styles.info}>
          <Text style={styles.nome}>{item.nome}</Text>

          <Text style={styles.forca}>
            💪 Força: {item.forca}
          </Text>

          <Text style={styles.tituloHabilidade}>
            Habilidades
          </Text>

          <Text style={styles.habilidade}>
            {item.habilidade}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>SUPER HERÓIS</Text>

      <Text style={styles.subtitulo}>
        Conheça seus heróis favoritos!
      </Text>

      {carregando && (
        <View style={styles.mensagem}>
          <ActivityIndicator size="large" color="#E63946" />
          <Text style={styles.textoMensagem}>
            Carregando heróis...
          </Text>
        </View>
      )}

      {erro && (
        <Text style={styles.erro}>
          Erro: {erro}
        </Text>
      )}

      {!carregando && !erro && herois.length === 0 && (
        <Text style={styles.textoMensagem}>
          Nenhum herói encontrado.
        </Text>
      )}

      {!carregando && !erro && (
        <FlatList
          data={herois}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101827',
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },

  subtitulo: {
    fontSize: 15,
    color: '#AAB4C5',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 25,
  },

  lista: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#1E293B',
    borderRadius: 18,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 5,
  },

  imagem: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },

  info: {
    padding: 18,
  },

  nome: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },

  forca: {
    fontSize: 16,
    color: '#FACC15',
    marginBottom: 15,
  },

  tituloHabilidade: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E63946',
    marginBottom: 6,
  },

  habilidade: {
    fontSize: 15,
    color: '#D1D5DB',
    lineHeight: 22,
  },

  mensagem: {
    alignItems: 'center',
    marginTop: 50,
  },

  textoMensagem: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },

  erro: {
    color: '#FF6B6B',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
});
