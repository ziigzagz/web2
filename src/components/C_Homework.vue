<template>
  <div class="container">
    <div class="row">
      <div class="col-1">
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary mt-2" dark v-bind="attrs" v-on="on" v-if="isAdmin">เพิ่ม</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">เพิ่มการบ้าน</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        id="select"
                      >
                        <option
                          v-for="(item, index) in homeworkTemplate"
                          :key="index"
                          :value="item.id"
                        >
                          {{ item.data }}
                        </option>
                      </select>
                    </v-col>
                  </v-row>
                </v-container>

                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> ปิด </v-btn>
                <v-btn color="blue darken-1" text @click="save"> บันทึก </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </div>
    <div class="row ">
      <div class="col">
        <input
         
          type="text"
          id="myInput_hw"
          @keyup="myFunction"
          placeholder="ค้นหาการบ้าน...."
          title="Type in a name"
        />
        <table class="table table-striped text-center" id="myTable_hw">
           <tr>
              <th scope="col">ครั้งที่</th>
              <th scope="col">การบ้าน</th>
              <th scope="col">เวลา</th>
              <th scope="col">สถานะ</th>
              <th scope="col">#</th>
            </tr>
            <tr v-for="(item, index) in homework" :key="index" >
              <td scope="row">{{ index + 1 }}</td>
              <td>{{ item.Name }}</td>
              <td>{{ item.data.date }}</td>
              <td v-if="item.data.status != 0"><span class="badge bg-success m-2">สำเร็จ</span></td>
              <td v-else><span class="badge bg-danger m-2">ยังไม่สำเร็จ</span></td>
              <td v-if="item.data.edit == '0'">
                <button v-if="!isAdmin" class="btn btn-info bg-info" @click="viewInfo(item.data.homeworkTemplate,item.id)">
                  ดู
                </button>
              </td>

            </tr>
        
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      dialog: false,
      homeworkTemplate: [],
      homework: [],
      homework_id: "",
      isAdmin: Boolean(parseInt(localStorage.getItem("isAdmin"))),
    };
  },

  async mounted() {
    var db = firebase.firestore();
var docRef2 = await db.collection("HomeworkTemplate")
.where("statusdel", "==", 0);
    // get data homework Template
    var docRef = await db.collection("HomeworkTemplate")
    .where("statusdel", "==", 0);;
    docRef.get().then((doc) => {
      doc.forEach((element) => {
        // console.log(element.data(), element.id);
        this.homeworkTemplate.push({
          id: element.id,
          data: element.data().Homework_name,
        });
      });
    });

    // get data homework patient
    var docRef = await db
      .collection("Homework")
      .where("user", "==", localStorage.getItem("uid"))
      .orderBy("date", "desc");
    docRef.get().then((doc) => {
      //  console.log(doc.docs[0].id)
       doc.forEach((element) => {
        // console.log(element.data().homeworkTemplate);
        docRef2 =  db.collection("HomeworkTemplate").doc(element.data().homeworkTemplate);
        docRef2.get().then((doc2) => {
          this.homework.push({ id: element.id, data: element.data(),Name:doc2.data().Homework_name });
          });
        // this.homework_id;
      });
    });
  },
  methods: {
    Watch(id) {
      Swal.fire(id);
    },
    myFunction() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInput_hw");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable_hw");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    },
    viewInfo(id_hwTemplate,id_hw) {
      // console.log(id);
      localStorage.setItem("id_hwTemplate", id_hwTemplate);
      localStorage.setItem("id_hw", id_hw);
      window.location.href = "/InfoHomework";
    },
    close() {
      this.dialog = false;
    },
    save() {
      var d = new Date();
      var date = d.getDate();
      var month = d.getMonth();
      var year = d.getFullYear();
      var hours = d.getHours();
      var minutes = d.getMinutes();
      var db = firebase.firestore();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      month += 1;
      // console.log(document.getElementById("select").value, 99);
      db.collection("Homework")
        .add({
          user: localStorage.getItem("uid"),
          edit:"0",
          homeworkTemplate: document.getElementById("select").value,
          timer_first:"0",
          status:0,
          timer_release:"0",
          date:
            date +
            "/" +
            month +
            "/" +
            year +
            " " +
            hours +
            ":" +
            minutes +
            "น.",
        })
        .then((docRef) => {
          // console.log("Document written with ID: ", docRef.id);
          this.dialog = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "บันทึกข้อมูลสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            location.reload();
          });
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    },
  },
};
</script>

<style>
#myInput_hw {
  background-position: 10px 10px;
  background-repeat: no-repeat;
  width: 100%;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
}
</style>