<template>
  <v-app>
    <v-form>
      <v-container class="basecard">
        <v-row>
          <v-spacer></v-spacer>
          <v-col sm="3">
            <h1>体重グラフ一覧</h1>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col sm="2">
            <v-select
              :items="selectyear"
              v-model="year"
              outlined
              dense
              label="year"
            ></v-select>
          </v-col>
          <v-col sm="2">
            <v-select
              :items="selectmonth"
              v-model="month"
              outlined
              dense
              label="month"
            ></v-select>
          </v-col>
          <v-col sm="1">
            <v-btn outlined color="teal" @click="select">
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-form>
    <v-row>
      <v-spacer></v-spacer>
      <v-col sm="6">
        <v-alert v-show="!this.getWeights.length" dense type="error"
          >登録されたデータはありません</v-alert
        >
        <v-alert
          dense
          type="error"
          v-show="!selectWeights.length && this.show == true"
        >
          <strong>{{ this.year }}/{{ this.month }}</strong>
          のデータは未登録です<v-btn
            @click="fillData"
            outlined
            class="button-error"
            >全て表示</v-btn
          >
        </v-alert>
        <v-alert dense type="error" v-show="this.unselected == true">
          選択してください
        </v-alert>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <div class="small">
      <line-chart :chart-data="datacollection" :options="options"></line-chart>
    </div>
  </v-app>
</template>

<script>
import LineChart from "../components/LineChart.js";

export default {
  components: {
    LineChart
  },
  watch: {
    getWeights() {
      console.log("値の更新");
    },
    getOnlyDates() {
      console.log("変更を検知");
    },
    getOnlyWeights() {
      console.log("変更を検知");
    }
  },
  data() {
    return {
      show: false, //エラー文表示（該当なし）
      unselected: false, //エラー文表示（未選択）
      datacollection: null,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                //目盛りの設定
                beginAtZero: true, //開始値を0
                min: 0, //最小値
                max: 80, //最大値
                stepSize: 5
              },
              scaleLabel: {
                display: true, //Y軸ラベルの表示
                labelString: "㎏",
                fontSize: 15
              }
            }
          ],
          xAxes: [
            //x軸
            {
              ticks: {
                autoSkip: true, //横幅が狭くなったときに表示を間引くか否か
                maxRotation: 90, //下のと合わせて表示される角度を決める
                minRoation: 90 //横幅を最小にしたときに縦に表示される
              },
              gridLines: {
                //x軸の網線
                display: true
              },
              scaleLabel: {
                //表示されるx軸の名称について
                display: true,
                labelString: "日付",
                fontSize: 15
              }
            }
          ]
        }
      },
      selectWeights: [],
      selectyear: ["2020", "2021", "2022"],
      selectmonth: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ],
      year: "",
      month: ""
    };
  },
  created() {
    this.fillData();
  },
  computed: {
    getWeights() {
      if (this.selectWeights.length === 0) {
        return this.$store.getters["weightStore/getWeights"];
      } else if (this.selectWeights.length > 0) {
        return this.selectWeights;
      }
    },
    getOnlyWeights() {
      let onlyWeights = [];
      this.getWeights.forEach(weight => {
        onlyWeights.push(weight.weight);
      });
      return onlyWeights;
    },
    getOnlyDates() {
      let onlyDates = [];
      this.getWeights.forEach(weight => {
        onlyDates.push(weight.date);
      });
      return onlyDates;
    }
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: this.methodsOnlyDates(),
        datasets: [
          {
            label: "体重",
            backgroundColor: "rgba(255, 143, 135, 0.568)",
            data: this.methodsOnlyWeights(),
            borderWidth: 5
          }
        ],
        options: {}
      };
    },
    //絞り込み処理------------------------------------------------
    select() {
      this.unselected = false;
      this.selectWeights = [];
      //セレクトされていたら処理開始
      if (this.year && this.month) {
        this.getWeights.forEach(weight => {
          let string = weight.date;
          let substring = this.year + "-" + this.month;

          //セレクトした日付とデータが一致したらselectWeight配列にpush
          if (string.indexOf(substring) > -1) {
            this.selectWeights.push(weight);
          }
        });
        //該当するデータがあればチャートのデータを更新
        if (this.selectWeights.length) {
          this.show = true;
          this.datacollection = {
            labels: this.getOnlyDates,
            datasets: [
              {
                label: "体重",
                data: this.getOnlyWeights,
                backgroundColor: "rgba(255, 143, 135, 0.568)"
              }
            ]
          };
        } //該当するデータが無ければエラー文を表示
        else if (!this.selectWeights.length) {
          this.show = true;
        }
      } //未選択でボタンを押した場合
      else {
        this.unselected = true;
      }
      return this.selectWeights;
    },
    methodsOnlyWeights() {
      return this.getOnlyWeights;
    },
    methodsOnlyDates() {
      return this.getOnlyDates;
    }
  }
};
</script>

<style scoped lang="scss">
.small {
  width: 700px;
  margin: 0px auto;
}
.button {
  &-error {
    margin-left: 10px;
  }
}
</style>
